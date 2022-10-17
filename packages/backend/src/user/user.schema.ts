import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from './status.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;
    @Prop({ required: true })
    password: string
    @Prop()
    name: string;
    @Prop({ type: Status })
    status: Status
    @Prop()
    email: string;
    @Prop()
    phoneNumber: string
    @Prop()
    adress: number;
}
export const UserSchema = SchemaFactory.createForClass(User);