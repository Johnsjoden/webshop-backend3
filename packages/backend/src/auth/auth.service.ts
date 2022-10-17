import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger()
  constructor(private usersService: UserService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const userInfo = {
      email: user._doc.email,
      userId: user._doc._id
    }
    const payload = { email: userInfo.email, sub: userInfo.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: "600000s",
      }),
    };
  }
}
