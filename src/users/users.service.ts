import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user/user.schema';
import { CreateUserDto } from 'src/dtos/user/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = new this.userModel({
      ...payload,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
