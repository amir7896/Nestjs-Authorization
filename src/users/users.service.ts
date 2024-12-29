import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user/user.schema';
import { CreateUserDto, LoginDto } from 'src/dtos/user/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(user: LoginDto) {
    return this.userModel.findOne({ email: user.email });
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: payload.email });
    if (existingUser) {
      throw new Error('UserAlreadyExists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new this.userModel({
      ...payload,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
