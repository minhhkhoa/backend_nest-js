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

  async findOne(id: string) {
    //- kiểm tra id có hợp lệ không voi mongoose.Types.ObjectId.isValid(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'id not valid!',
      };
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      return {
        message: 'not found user!',
      };
    }
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { $set: updateUserDto }, //-$set giúp tránh việc ghi đè toàn bộ document; chỉ những trường được chỉ định mới bị thay đổi.
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'id not invalid!',
      };
    }

    const user = await this.userModel.findById(id);

    if (!user) {
      return {
        message: 'not found user want delete!',
      };
    }

    return await this.userModel.deleteOne({ _id: id });
  }
}
