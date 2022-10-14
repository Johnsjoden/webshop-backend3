import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { Products, ProductsSchema } from './products.schema';
import { ProductsService } from './products.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}