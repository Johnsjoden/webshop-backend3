import { Body, Controller, Get, Logger, Patch, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/security/jwt-authguard';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private readonly logger = new Logger()
    constructor(private readonly userService: UserService, @InjectModel(User.name) private userModel: Model<UserDocument>) { }
    @Post()
    async create(@Body() user: User) {
        const email = user.email.toLowerCase()
        const userAlreadyCreated = await this.userModel.findOne({ email: email })
        if (user.email.length < 5 || user.password.length < 5 || userAlreadyCreated) {
            throw new HttpException('Email and password should have 5 characters or Email already exists', 409);
        }
        return this.userService.create(user)
    }
    @UseGuards(JwtAuthGuard)
    @Patch('updateuser')
    async updateUser(@Body() user: User, @Request() req) {
        return this.userService.updateUser(user, req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async finduser(@Request() req) {
        return this.userService.finduser(req.user.userId)
    }
}
