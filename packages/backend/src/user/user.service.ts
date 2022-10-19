import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { Products } from 'src/products/products.schema';
import { randomUUID } from 'crypto';


@Injectable()
export class UserService {
    private readonly logger = new Logger()
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(user: User): Promise<User> {
        user.email = user.email.toLowerCase()
        user.password = await bcrypt.hash(user.password, 10);
        const result = await this.userModel.create(user)
        return result.save()
    }
    async user(): Promise<User[]> {
        const result = await this.userModel.find().exec();
        return result
    }
    async findOne(email: string): Promise<User> {
        const result = await this.userModel.findOne({ email })
        return result
    }
    async addToBasket(products: Products[], _id: string): Promise<String> {
        const user = await this.userModel.findOne({ _id: _id })
        const id = randomUUID()
        let cart = {
            _id: id,
            delieveryFee: 399,
            totalPrice: 0,
            products: user.status.cart.products
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
        const result = await this.userModel.findOneAndUpdate({ _id: _id }, { "status.cart": cart })
        return "ok"
    }
    async addToRegistered(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.cart.products": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { "status.register": user.status.cart })
    }
    async addToTreated(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.register": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.treated": { $each: user.status.register } } })
    }
    async addToUnderdelivery(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.treated": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.underDelivery": { $each: user.status.treated } } })
    }
    async addToDelivered(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.underDelivery": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.delivery": { $each: user.status.underDelivery } } })
    }
    async deleteCart(_id: string): Promise<String> {
        const resetCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.cart.products": [] } })
        return "deleted cart"
    }
}
