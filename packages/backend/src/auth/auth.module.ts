import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './security/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.modul';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './security/jwt-strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtService, JwtStrategy],
    exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
