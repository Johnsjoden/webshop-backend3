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
    async updateUser(user: User, _id: string): Promise<User> {
        user.name = user.name.toLowerCase()
        user.email = user.email.toLowerCase()
        user.adress = user.adress.toLowerCase()
        return await this.userModel.findOneAndUpdate({ _id: _id }, user, { new: true })

    }

    async finduser(_id: string): Promise<User> {
        return await this.userModel.findOne({ _id: _id }).exec();
    }

    async findOne(email: string): Promise<User> {
        const result = await this.userModel.findOne({ email })
        return result
    }
    async addToBasket(products: Products, _id: string): Promise<User> {
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.varukorg": { $each: products } } }, {new: true})
    }
    async addToRegistered(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        let id = randomUUID()
        let totalPrice: number = 0
        user.status.varukorg.forEach(item => {
            totalPrice += item.price
        })
        let kundvagn = {
            _id: id,
            totalPrice: totalPrice,
            products: user.status.varukorg
        }
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.varukorg": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.registrerad": kundvagn } })
    }
    async addToTreated(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.registrerad": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.behandlas": { $each: user.status.registrerad } } })
    }
    async addToUnderdelivery(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.behandlas": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.underleverans": { $each: user.status.behandlas } } })
    }
    async addToDelivered(_id: string): Promise<String> {
        const user = await this.userModel.findById(_id)
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: _id }, { $set: { "status.underleverans": [] } })
        return await this.userModel.findOneAndUpdate({ _id: _id }, { $push: { "status.levererad": { $each: user.status.underleverans } } })
    }
}
