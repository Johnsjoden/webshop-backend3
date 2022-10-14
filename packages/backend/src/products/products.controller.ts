import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './products.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        @InjectModel(Products.name) private userModel: Model<ProductsDocument>,
        private readonly productsService: ProductsService) { }
    @Post()
    create(@Body() product: Products) {
        return this.productsService.create(product)
    }
    @Get()
    findAll() {
        return this.productsService.findAll()
    }
}
