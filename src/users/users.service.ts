import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  //- tiêm model User vào constructor lên trang chủ đọc tài liệu hướng dẫn
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword(password: string): string {
    const salt: string = genSaltSync(10);
    const hash: string = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword: string = this.getHashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    //- kiểm tra id có hợp lệ không voi mongoose.Types.ObjectId.isValid(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'not found user!',
      };
    }
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
