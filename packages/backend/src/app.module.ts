import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.modul';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/webshop'),
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
