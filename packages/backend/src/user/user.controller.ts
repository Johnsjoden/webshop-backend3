import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }
    @Post()
    create(@Body() user: User) {
        /* const alreadyUser = this.userModel.find(user.username) */
        return this.userService.create(user)
    }
    @Get()
    user() {
        return this.userService.user()
    }
}
