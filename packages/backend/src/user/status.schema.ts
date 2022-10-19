import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cart } from './cart.schema';

export class Status extends Document {
    @Prop({ type: Cart, default: { cart: Cart} })
    cart: Cart
    @Prop({ type: Cart })
    register: Cart
    @Prop({ type: Cart })
    treated: Cart
    @Prop({ type: Cart })
    underDelivery: Cart
    @Prop({ type: Cart })
    delivered: Cart
}