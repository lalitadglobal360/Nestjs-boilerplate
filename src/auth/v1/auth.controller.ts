import { Controller,Body,Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import loginDto from './dto/login.dto';

@ApiTags('Auth')
@Controller({version: '1',path:'auth'})
export class AuthController {
    constructor(private readonly  authService: AuthService) {}
    //@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginData:loginDto) {
    console.log("login data",loginData)
   return this.authService.validateUserCredentials(loginData.username,loginData.password);
  }
}
