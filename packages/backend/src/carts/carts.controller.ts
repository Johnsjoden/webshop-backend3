import { Body, Controller, Patch, UseGuards, Request, Get, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    getCartProducts(@Request() req){
        return this.cartsService.getCartProducts(req.user.userId)
    } 

    @UseGuards(JwtAuthGuard)
    @Patch("registered")

    addToRegistered(@Request() req) {
        return this.cartsService.addToRegistered(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("treated")
    addToTreated(@Request() req) {
        return this.cartsService.addToTreated(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("underdelivery")
    addToUnderdelivery(@Request() req) {
        return this.cartsService.addToUnderdelivery(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("delivered")
    addToDelivered(@Request() req) {
        return this.cartsService.addToDelivered(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Delete("delete")
    deleteCart(@Request() req) {
        return this.cartsService.deleteCart(req.user.userId)
    }
}
