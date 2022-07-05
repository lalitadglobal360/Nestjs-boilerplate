import { Controller, Get,Body, Req, HttpCode, Post,  Request, UseGuards,Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder,SwaggerDocumentOptions,ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import RegisterDto from './users/dto/create-user.dto';
import loginDto from './auth/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
@ApiTags('Auth')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @Get()
  getHello(): string {
    this.logger.log('Hello');
    return this.appService.getHello();
  }
  
  //@UseGuards(AuthGuard('local'))
  @Post('login')
 
  async login(@Body() loginData:loginDto) {
    console.log("login data",loginData)
//     const algorithm = process.env.CRYPTO_ALGORITHM;
//         const secretKey = process.env.CRYPTO_SECRET;
//         const hash = loginData.data
//          const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
//     this.logger.log("Login"+JSON.stringify(loginData));
//     const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));

//     const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

//     let finaldata =  decrpyted.toString();
// console.log(`finaldata ${finaldata}`)
   return this.authService.validateUserCredentials(loginData.username,loginData.password);
  }

  
}
