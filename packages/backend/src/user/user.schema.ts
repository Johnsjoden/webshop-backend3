import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from './status.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string
    @Prop()
    name: string;
    @Prop({ type: Status, default: { cart: { products: [] } } })
    status: Status
    @Prop()
    phonenumber: string
    @Prop()
    adress: string;
}
export const UserSchema = SchemaFactory.createForClass(User);