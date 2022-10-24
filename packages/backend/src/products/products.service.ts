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
        console.log("Search Service", search)
        return products
    }

    async findSingle(_id: string): Promise<Products> {
        const product = await this.productsModel.findById({ _id: _id })
        return product
    }

}
