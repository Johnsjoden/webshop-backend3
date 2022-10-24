import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carts, CartsSchema } from './carts.schema';
import { Products, ProductsSchema } from 'src/products/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carts.name, schema: CartsSchema }, { name: Products.name, schema: ProductsSchema }])],
  providers: [CartsService],
  controllers: [CartsController],
  exports: [CartsService,]
})
export class CartsModule { }
