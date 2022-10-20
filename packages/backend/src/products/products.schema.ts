import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    })
    _id: Types.ObjectId
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