import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUseDto } from './dto/create-user.dto';
import { User } from './interfaces/users.inteface';
import { match } from 'assert';
import { AuthService } from 'src/auth/auth.service';
import { LoginUseDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly usersModel: Model<User>, private readonly authService: AuthService) {}

    public async create(data: CreateUseDto) {
        const user = new this.usersModel(data);
        return await user.save();
    }

    public async login(req: Request, data: LoginUseDto) {
        const user = await this.findByEmail(data.email);
        const match = await this.checkPassword(data.password, user);
        if (match) {
            return {
                fullName: user.fullName,
                email: user.email,
                accessToken: await this.authService.createAccessToken(user._id)
            };
        }
    }

    private async findByEmail(email: string) {
        const user = await this.usersModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('Wrong email or password');
        }
        return user;
    }

    private async checkPassword(password: string, user) {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new NotFoundException('Wrong email or password');
        }
        return match;
    }
}
