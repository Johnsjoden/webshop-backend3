import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(user: User): Promise<User> {
        user.email = user.username.toLowerCase()
        const result = await this.userModel.create(user)
        return result.save()
    }
    async user(): Promise<User[]> {
        const result = await this.userModel.find().exec();
        return result
    }
    async findOne(username: string): Promise<User> {
        const result = await this.userModel.findOne({username})
        return result
    }
}
