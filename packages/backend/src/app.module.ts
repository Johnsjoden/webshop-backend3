import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.modul';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './carts/carts.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductsModule,
    CartsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/files'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
