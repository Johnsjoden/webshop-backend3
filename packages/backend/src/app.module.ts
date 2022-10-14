import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.modul';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: []
})
export class AppModule { }