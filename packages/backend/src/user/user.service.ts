import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { Products } from 'src/products/products.schema';


@Injectable()
export class UserService {
    private readonly logger = new Logger()
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(user: User): Promise<User> {
        user.username = user.username.toLowerCase()
        user.password = await bcrypt.hash(user.password, 10);
        const result = await this.userModel.create(user)
        return result.save()
    }
    async user(): Promise<User[]> {
        const result = await this.userModel.find().exec();
        return result
    }
    async findOne(username: string): Promise<User> {
        const result = await this.userModel.findOne({ username })
        return result
    }
    async addToBasket(products: Products): Promise<String> {
        const result = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $push: { "status.varukorg": { $each: products } } })
        this.logger.debug(result)
        return "ok"
    }
    async addToRegistered(): Promise<String> {
        const user = await this.userModel.findById("634d39f09c1e8e3065af65e2")
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $set: { "status.varukorg": [] } })
        const result = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $push: { "status.registrerad": { $each: user.status.varukorg } } })
        return "ok"
    }
    async addToTreated(): Promise<String> {
        const user = await this.userModel.findById("634d39f09c1e8e3065af65e2")
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $set: { "status.registrerad": [] } })
        const result = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $push: { "status.behandlas": { $each: user.status.registrerad } } })
        return "Ok"
    }
    async addToUnderdelivery(): Promise<String> {
        const user = await this.userModel.findById("634d39f09c1e8e3065af65e2")
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $set: { "status.behandlas": [] } })
        const result = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $push: { "status.underleverans": { $each: user.status.behandlas } } })
        return "Ok"
    }
    async addToDelivered(): Promise<String> {
        const user = await this.userModel.findById("634d39f09c1e8e3065af65e2")
        const productsRemovedFromCart = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $set: { "status.underleverans": [] } })
        const result = await this.userModel.findOneAndUpdate({ _id: "634d39f09c1e8e3065af65e2" }, { $push: { "status.levererad": { $each: user.status.underleverans } } })
        return "Ok"
    }
}
