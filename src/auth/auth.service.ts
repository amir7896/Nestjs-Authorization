import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../interfaces/jwt/jwt-payload.interface';
import { LoginRequest } from '../interfaces/user/login-request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }

  async login(user: LoginRequest) {
    const userObj = await this.usersService.findOne(user.username);
    const payload = {
      username: userObj.username,
      role: userObj.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
