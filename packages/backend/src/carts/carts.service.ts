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
    async addToRegistered(_id: string): Promise<String> {
        const cart = await this.cartModel.findOne({ userId: _id })
        const cartArray = []
        cartArray.push(cart.cart)
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ userId: _id }, { $set: { "cart": { "products": [] } } })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "register": { $each: cartArray } } })
    }
    async addToTreated(_id: string): Promise<String> {
        const cart = await this.cartModel.findOne({ userId: _id })
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ userId: _id }, { $set: { "register": [] } })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "treated": { $each: cart.register } } }, { new: true })
    }
    async addToUnderdelivery(_id: string): Promise<String> {
        const cart = await this.cartModel.findOne({ userId: _id })
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ userId: _id }, { $set: { "treated": [] } })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "underDelivery": { $each: cart.treated } } }, { new: true })
    }
    async addToDelivered(_id: string): Promise<String> {
        const cart = await this.cartModel.findOne({ userId: _id })
        const productsRemovedFromCart = await this.cartModel.findOneAndUpdate({ userId: _id }, { $set: { "underDelivery": [] } })
        return await this.cartModel.findOneAndUpdate({ userId: _id }, { $push: { "delivered": { $each: cart.underDelivery } } }, { new: true })
    }
    async deleteCart(_id: string): Promise<String> {
        const resetCart = await this.cartModel.findOneAndUpdate({ _id: _id }, { $set: { "cart": { "products": [] } } })
        return "deleted cart"
    }
}
