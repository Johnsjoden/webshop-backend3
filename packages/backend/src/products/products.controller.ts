
import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import { Products, ProductsDocument } from './products.schema';
import { ProductsService } from './products.service';
import { randomUUID } from "crypto"
@Controller('products')
export class ProductsController {
    constructor(
        @InjectModel(Products.name) private productModel: Model<ProductsDocument>,
        private readonly productsService: ProductsService) { }
    @Post()
    create(@Body() product: Products) {
        return this.productsService.create(product)
    }
    @Get()
    findAll() {
        return this.productsService.findAll()
    }

    @Post("search")
    search(@Body() searchQuery) {
        return this.productsService.search(searchQuery)
    }


    @Get(":id")
    findSingle(@Param() req) {
        return this.productsService.findSingle(req.id)
    }


    @Post("uploads")
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: function (req: any, file: { originalname: any }, cb: (arg0: null, arg1: any) => void) {
                    let id = randomUUID()
                    cb(null, `${id}${file.originalname}`)
                }
            })
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
