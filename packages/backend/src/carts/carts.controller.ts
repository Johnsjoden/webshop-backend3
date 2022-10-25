import { Body, Controller, Patch, UseGuards, Request, Get, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/security/jwt-authguard';
import { Products, ProductsDocument, ProductsSchema } from 'src/products/products.schema';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService, @InjectModel(Products.name) private productsModel: Model<ProductsDocument>) { }
    @UseGuards(JwtAuthGuard)
    @Patch()
    addToBasket(@Body() products: Products[], @Request() req) {
        return this.cartsService.addToBasket(products, req.user.userId)

    }


    @UseGuards(JwtAuthGuard)
    @Get()
    getCartProducts(@Request() req) {
        return this.cartsService.getCartProducts(req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("registered")
    addToRegistered(@Request() req) {
        return this.cartsService.addToRegistered(req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("registered")
    getRegisteredProducts(@Request() req) {
        return this.cartsService.getCartProducts(req.user.userId)
    }

    @Cron('5 * * * * *')
    addToTreated() {
        return this.cartsService.addToTreated()
    }
    @Cron("10 * * * * *")
    addToUnderdelivery() {
        return this.cartsService.addToUnderdelivery()
    }
    @Cron("15 * * * * *")
    addToDelivered(@Request() req) {
        return this.cartsService.addToDelivered()
    }
    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    deleteCart(@Request() req) {
        return this.cartsService.deleteCart(req.user.userId)
    }
}
