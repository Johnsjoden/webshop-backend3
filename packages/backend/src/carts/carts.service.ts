import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Products } from 'src/products/products.schema';
import { Carts, CartsDocument } from './carts.schema';

@Injectable()
export class CartsService {
    constructor(@InjectModel(Carts.name) private cartModel: Model<CartsDocument>) { }
    async addToBasket(products: Products[], _id: string): Promise<String> {
        const cartss = await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "cart.products": { $each: products } } }).populate("userId")
        /* const carts = await this.cartModel.findOne({ _id: "63503904a6ad72dae5fa8aee" }).populate("userId") fungerar*/
        console.log(cartss)
        /* const id = randomUUID()
        let cart = {
            _id: id,
            delieveryFee: 399,
            totalPrice: 0,
            products: carts.cart.products
        }
        products.forEach(product => {
            if (cart.products.find(item => item.product._id === product._id)) {
                cart.products.find(item => {
                    if (item.product._id === product._id) {
                        item.quantity = item.quantity + 1
                    }
                })
            } else {
                cart.products.push({
                    quantity: 1,
                    product: product
                })
            }
        })
        cart.products.forEach(item => {
            cart.totalPrice += item.quantity * item.product.price
        })
        return await this.cartModel.findOneAndUpdate({ _id: _id }, { "cart.cart": cart }, { new: true }) */
        return "Ok"

    }
    /* async addToRegistered(_id: string): Promise<String> {
        const user = await this.cartModel.findById(_id)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart.cart.products": [] } })
        return await this.cartModel.findOneAndUpdate({ _id: _id }, { "cart.register": user.cart.cart })
    }
    async addToTreated(_id: string): Promise<String> {
        const user = await this.cartModel.findById(_id)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart.register": [] } })
        return await this.cartModel.findOneAndUpdate({ _id: _id }, { $push: { "cart.treated": { $each: user.cart.register } } })
    }
    async addToUnderdelivery(_id: string): Promise<String> {
        const user = await this.cartModel.findById(_id)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart.treated": [] } })
        return await this.cartModel.findOneAndUpdate({ _id: _id }, { $push: { "cart.underDelivery": { $each: user.cart.treated } } })
    }
    async addToDelivered(_id: string): Promise<String> {
        const user = await this.cartModel.findById(_id)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart.underDelivery": [] } })
        return await this.cartModel.findOneAndUpdate({ _id: _id }, { $push: { "cart.delivery": { $each: user.cart.underDelivery } } })
    }
    async deleteCart(_id: string): Promise<String> {
        const resetCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart.cart.products": [] } })
        return "deleted cart"
    } */
}
