import { Controller, Get,Body, Req, HttpCode, Post,  Request, UseGuards,Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder,SwaggerDocumentOptions,ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import RegisterDto from './users/v1/dto/create-user.dto';
import loginDto from './auth/v1/dto/login.dto';
import encryptionDto from './auth/v1/dto/encryption.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/v1/auth.service';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
interface StringMap { [key: string]: string; }

@ApiTags('dev')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @Get()
  getHello(): string {
    this.logger.log('Hello');
    return this.appService.getHello();
  }

  @Post('encrypt-data')
  async encrypt(@Body() plainData:encryptionDto) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const secretKey = process.env.CRYPTO_SECRET;
    const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
    const cipher = createCipheriv(algorithm, secretKey, iv);
    const encrypted =  Buffer.concat([cipher.update(JSON.stringify(plainData)), cipher.final()]);
    return {encrypted: encrypted.toString('hex')}
  };

  @Post('decrypt-data')
  async decrypt(@Body() plainData:encryptionDto) {
    const algorithm = process.env.CRYPTO_ALGORITHM;
    const secretKey = process.env.CRYPTO_SECRET;
    const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
    const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(plainData.encrypted, 'hex')), decipher.final()]);
    return {
        data:JSON.parse(decrpyted.toString())
    }
  };

  
}
