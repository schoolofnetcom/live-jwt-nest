import { PassportStrategy } from '@nestjs/passport';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: authService,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }
}