import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async register(@Body() user) {
        return this.usersService.create(user);
    }
}
