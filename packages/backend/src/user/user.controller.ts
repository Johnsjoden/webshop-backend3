import { Body, Controller, Get, Logger, Patch, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/security/jwt-authguard';
import { Products } from 'src/products/products.schema';
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
        this.logger.debug(userAlreadyCreated)
        if (userAlreadyCreated) {
            throw new HttpException('email already in use', 409);
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
    @UseGuards(JwtAuthGuard)
    @Patch("cart")
    addToBasket(@Body() products: Products, @Request() req) {
        return this.userService.addToBasket(products, req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/registered")
    addToRegistered(@Request() req) {
        return this.userService.addToRegistered(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/treated")
    addToTreated(@Request() req) {
        return this.userService.addToTreated(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/underdelivery")
    addToUnderdelivery(@Request() req) {
        return this.userService.addToUnderdelivery(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/delivered")
    addToDelivered(@Request() req) {
        return this.userService.addToDelivered(req.user.userId)
    }
}