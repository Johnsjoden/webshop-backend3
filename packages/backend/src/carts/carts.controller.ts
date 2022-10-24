import { Body, Controller, Patch, UseGuards,Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/security/jwt-authguard';
import { Products } from 'src/products/products.schema';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService){}
    @UseGuards(JwtAuthGuard)
    @Patch()
    addToBasket(@Body() products: Products[], @Request() req) {
        /* if(products._id === dbproduct._id){

        } */
        return this.cartsService.addToBasket(products, req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCartProducts(@Request() req){
        return this.cartsService.getCartProducts(req.user.userId)
    } 

    /* @UseGuards(JwtAuthGuard)
    @Patch("cart/registered")
    addToRegistered(@Request() req) {
        return this.cartsService.addToRegistered(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/treated")
    addToTreated(@Request() req) {
        return this.cartsService.addToTreated(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/underdelivery")
    addToUnderdelivery(@Request() req) {
        return this.cartsService.addToUnderdelivery(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("cart/delivered")
    addToDelivered(@Request() req) {
        return this.cartsService.addToDelivered(req.user.userId)
    }
    @UseGuards(JwtAuthGuard)
    @Delete("cart/delete")
    deleteCart(@Request() req) {
        return this.cartsService.deleteCart(req.user.userId)
    } */
}
