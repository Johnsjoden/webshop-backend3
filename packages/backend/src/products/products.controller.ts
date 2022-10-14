import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
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
    @Post("uploads")
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
            }),
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
}
