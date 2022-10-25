import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { Products } from 'src/products/products.schema';
import { Carts, CartsDocument } from './carts.schema';

@Injectable()
export class CartsService {
    constructor(@InjectModel(Carts.name) private cartModel: Model<CartsDocument>,) { }
    async addToBasket(products: Products[], _id: string): Promise<String> {
        const cartss = await this.cartModel.findOne({ userId: _id })
        const id = randomUUID()
        let cart = {
            _id: id,
            delieveryFee: 399,
            totalPrice: 0,
            status: "cart",
            products: cartss.cart.products
        }
        products.forEach(product => {
            if (cart.products.find(item => item._id === product._id)) {
                cart.products.find(item => {
                    if (item._id === product._id) {
                        item.quantity = item.quantity + 1
                    }
                })
            } else {
                cart.products.push({
                    ...product,
                    quantity: 1
                })
            }
        })
        cart.products.forEach(item => {
            cart.totalPrice += item.quantity * item.price
        })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { "cart": cart }, { new: true })
    }


    async getCartProducts(_id: string): Promise<Carts[]> {
        return await this.cartModel.findOne({ userId: _id })
    }

    async getRegistedProducts(_id: string): Promise<Carts[]> {
        return await this.cartModel.findOne({ userId: _id })
    }

    async addToRegistered(_id: string): Promise<String> {
        const cart = await this.cartModel.findOne({ userId: _id })
        const cartArray = []
        cart.cart.status = "registered"
        cartArray.push(cart.cart)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ userId: _id }, { $set: { "cart": { "products": [] } } })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "register": { $each: cartArray } } })

    }
    async addToTreated(): Promise<String> {
        console.log("anrop till treated")
        const result = await this.cartModel.updateMany({ "register.status": { $in: ["registered"] } }, { $set: { "register.$.status": "treated" } })
        return "result"
    }
    async addToUnderdelivery(): Promise<any> {
        console.log("anrop till undelievery")
        return await this.cartModel.updateMany({ "register.status": { $in: ["treated"] } }, { $set: { "register.$.status": "underDelivery" } })
    }
    async addToDelivered(): Promise<any> {
        console.log("anrop till delievered")
        return await this.cartModel.updateMany({ "register.status": { $in: ["underDelivery"] } }, { $set: { "register.$.status": "delivered" } })
    }
    async deleteCart(_id: string): Promise<String> {
        const resetCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart": { "products": [] } } })
        return "deleted cart"
    }
}
