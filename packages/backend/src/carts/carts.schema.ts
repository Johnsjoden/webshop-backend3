import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Cart } from './cart.schema';

export type CartsDocument = Carts & Document;

@Schema()
export class Carts {
    @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
    userId: Types.ObjectId;
    @Prop({ type: Cart, default: { products: [] } })
    cart: Cart
    @Prop({ type: Cart, default: [] })
    register: [Cart]
    @Prop({ type: Cart, default: [] })
    treated: [Cart]
    @Prop({ type: Cart, default: [] })
    underDelivery: [Cart]
    @Prop({ type: Cart, default: [] })
    delivered: [Cart]
}


cart: {

}


export const CartsSchema = SchemaFactory.createForClass(Carts);