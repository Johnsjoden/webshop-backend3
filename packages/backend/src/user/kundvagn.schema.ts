import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class kundvagn extends Document {
    @Prop()
    _id: string
    @Prop()
    totalPrice: number
    @Prop()
    products: []
}