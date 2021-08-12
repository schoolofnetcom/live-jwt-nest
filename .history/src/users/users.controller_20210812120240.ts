import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Controller } from '@nestjs/common';
import { CreateUseDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async register(@Body() user: CreateUseDto) {
        return this.usersService.create(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Req() req: Request, @Body() data) {
        return this.usersService.login(req, data);
    }
}
