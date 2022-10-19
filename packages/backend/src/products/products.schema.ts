import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
    @Prop()
    _id: string
    @Prop({ required: true })
    description: string;
    @Prop({ required: true })
    title: string
    @Prop({ required: true })
    image_url: string;
    @Prop({ required: true })
    category: string;
    @Prop({ required: true })
    weight: string
    @Prop({ required: true })
    price: number;
    @Prop({ required: true })
    manufacturer: string
}

export const ProductsSchema = SchemaFactory.createForClass(Products);