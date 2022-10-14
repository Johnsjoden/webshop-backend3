import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/webshop'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule],
  controllers: [UserController, AuthController],
  providers: [UserService, LocalStrategy, AuthService],
})
export class AppModule { }
