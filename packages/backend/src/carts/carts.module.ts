import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carts, CartsSchema } from './carts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Carts.name, schema: CartsSchema }])],
  providers: [CartsService],
  controllers: [CartsController],
  exports: [CartsService]
})
export class CartsModule { }
