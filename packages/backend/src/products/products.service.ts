import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './products.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Products.name) private productsModel: Model<ProductsDocument>) { }

    async create(product: Products): Promise<Products> {
        const products = await this.productsModel.create(product)
        return products.save()
    }
    async createProducts(): Promise<string> {
        const productss = [{
            "description": "A top of the line stick manufactured by Kosa for the practioners of sports bandy",
            "title": "Bandyklubba ",
            "image_url": "https://www.xxl.se/filespin/10464871ed6b4664a24986ab49625bc4?resize=1400,1400&quality=95&bgcolor=efefef",
            "category": "Sports",
            "weight": "1kg",
            "price": "250",
            "manufacturer": "Kosa"
        },
        {
            "description": "A Samsung TV6 with the newest features and electronics",
            "title": "Samsung TV",
            "image_url": "https://www.elgiganten.se/image/dv_web_D180001002954480/431084/samsung-65-q60b-4k-qled-tv-2022--pdp_zoom-3000--pdp_main-960.jpg",
            "category": "Electronics",
            "weight": "30kg",
            "price": "5000",
            "manufacturer": "Samsung"
        },
        {
            "description": "A Fotball manufactured by FIFA for the World Cup sports event in 2022",
            "title": " FOTBALL 2022",
            "image_url": "https://plus.unsplash.com/premium_photo-1658506638118-524a66dc5cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vdGJhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            "category": "Sports",
            "weight": "1kg",
            "price": "100",
            "manufacturer": "FIFA"
        }]
        const productsss = await this.productsModel.find()
        productsss.forEach(async (item) => {
            const products = await this.productsModel.findOneAndDelete({ _id: item._id })
        })
        /* productss.forEach(async (item) => {
            const products = await this.productsModel.findOneAndDelete({})
        }) */
        productss.forEach(async (item) => {
            const products = await this.productsModel.create(item)
            products.save()
        })
        return "ok"
    }
    async findAll(): Promise<Products[]> {
        const products = await this.productsModel.find()
        return products
    }
    async search(search): Promise<any> {
        // const products = await this.productsModel.find({ description: { search } })
        // let word = search.golfclub;
        // this.search = search
        let word = search.searchQuery
        // const products = await this.productsModel.find({ description: { $regex: word } })
        const products = await this.productsModel.find({ description: { $regex: new RegExp(`\\b${word}\\b`, "gi") } })
        return products
    }

    async findSingle(_id: string): Promise<Products> {
        const product = await this.productsModel.findById({ _id: _id })
        return product
    }

}
