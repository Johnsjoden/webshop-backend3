import { Body, Controller, Get, Logger, Patch, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/products/products.schema';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private readonly logger = new Logger()
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
    @Patch("cart")
    addToBasket(@Body() body: Products) {
        return this.userService.addToBasket(body)
    }
    @Patch("cart/registered")
    addToRegistered() {
        return this.userService.addToRegistered()
    }
    @Patch("cart/treated")
    addToTreated() {
        return this.userService.addToTreated()
    }
    @Patch("cart/underdelivery")
    addToUnderdelivery() {
        return this.userService.addToUnderdelivery()
    }
    @Patch("cart/delivered")
    addToDelivered() {
        return this.userService.addToDelivered()
    }
}
