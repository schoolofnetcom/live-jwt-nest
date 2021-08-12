import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(jwtPayload: JwtPayload) {
        const user = await this.authService.validateUser(jwtPayload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}