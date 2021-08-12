import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/users.inteface';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly usersModel: Model<User>) {

    }

    public async validateUser(jwtyPayload: JwtPayload) {
        const user = await this.usersModel.findOne({ _id: jwtyPayload.userId });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }

    private jwtExtractor(request) {
        let token = null;
        if (request.headers.authorization) {
            token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
        }
        if (!token) {
            throw new BadRequestException('Bad request');
        }
        return token;
    }

    public returnJwtExtractor() {
        return this.jwtExtractor;
    }
}
