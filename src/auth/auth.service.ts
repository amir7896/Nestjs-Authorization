import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role, // Ensure role is added here
    };
  }

  async login(user: any) {
    const userObj = await this.usersService.findOne(user.username);
    const payload = {
      username: userObj.username,
      role: userObj.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
