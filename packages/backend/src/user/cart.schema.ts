import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Products } from 'src/products/products.schema';

export class Cart extends Document {
    @Prop()
    _id: string
    @Prop()
    delieveryFee: number
    @Prop()
    totalPrice: number
    @Prop({ default: [] })
    products: [{
        quantity: number
        product: Products
    }]
}