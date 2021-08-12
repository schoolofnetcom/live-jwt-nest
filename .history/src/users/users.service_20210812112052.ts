import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUseDto } from './dto/create-user.dto';
import { User } from './interfaces/users.inteface';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}

    public async create(data: CreateUseDto) {
        const user = new this.usersModel(data);
        return await user.save();
    }
}
