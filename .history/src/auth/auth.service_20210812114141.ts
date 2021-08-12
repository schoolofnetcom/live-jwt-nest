import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor() {

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
