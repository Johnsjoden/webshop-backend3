import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './security/jwt-authguard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
