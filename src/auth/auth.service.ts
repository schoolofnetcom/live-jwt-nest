import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { sign } from 'jsonwebtoken';
import { User } from 'src/users/interfaces/users.inteface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}

    public async createAccessToken(userId: string) {
        const accessToken = sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        return accessToken;
    }

    public async validateUser(jwtPayload: JwtPayload) {
        const user = await this.usersModel.findOne({ _id: jwtPayload.userId });
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
