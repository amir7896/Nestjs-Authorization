import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../interfaces/jwt/jwt-payload.interface';
import { LoginDto } from '../dtos/user/user.dto';

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

  async login(user: LoginDto) {
    const userObj = await this.usersService.findOne(user);

    if (!userObj) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(
      user.password,
      userObj.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      username: userObj.username,
      role: userObj.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
