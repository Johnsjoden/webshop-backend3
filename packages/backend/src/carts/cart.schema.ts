import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class Cart extends Document {
    @Prop()
    _id: string
    @Prop()
    delieveryFee: number
    @Prop()
    totalPrice: number
    @Prop()
    products: [
        {
            quantity: number,
            _id: Types.ObjectId,
            description: string,
            title: string,
            image_url: string,
            category: string,
            weight: string,
            price: number,
            manufacturer: string,
        }
    ]
}