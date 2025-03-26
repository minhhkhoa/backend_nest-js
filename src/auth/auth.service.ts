import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser({ email });
    if (user) {
      const isArr = Array.isArray(user);
      const isValid: boolean = this.usersService.isValidPassword(
        pass,
        isArr ? user[0].password : user.password,
      );
      if (isValid) {
        return user;
      }
    }
    return null;
  }
}
