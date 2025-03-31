import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/schemas/user.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log('check PORT: ', this.configService.get<string>('PORT'));
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  handleLogin(@Request() req: Request): User {
    return req.user;
  }
}
