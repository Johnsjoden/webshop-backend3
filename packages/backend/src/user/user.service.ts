import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { Products } from 'src/products/products.schema';
import { randomUUID } from 'crypto';
import { Carts, CartsDocument } from 'src/carts/carts.schema';


@Injectable()
export class UserService {
    private readonly logger = new Logger()
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Carts.name) private cartModel: Model<CartsDocument>) { }

    async create(user: User): Promise<User> {
        user.email = user.email.toLowerCase()
        user.password = await bcrypt.hash(user.password, 10);
        const result = await this.userModel.create(user)
        result.save()
        const userCreated = await this.userModel.findOne({ email: user.email })
        const createCart = await this.cartModel.create({ userId: userCreated._id })
        return result
    }
    async updateUser(user: User, _id: string): Promise<User> {
        console.log("user", user)
        user.name = user.name.toLowerCase()
        user.email = user.email.toLowerCase()
        return await this.userModel.findOneAndUpdate({ _id: _id }, user, { new: true })

    }

    async finduser(_id: string): Promise<User> {
        return await this.userModel.findOne({ _id: _id }).exec();
    }

    async findOne(email: string): Promise<User> {
        const result = await this.userModel.findOne({ email })
        return result
    }
}
