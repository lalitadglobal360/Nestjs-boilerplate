import { Controller, Get,Body, Post,Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import {encryptionDto} from './users/v1/dto/encryption.dto';
import { createCipheriv, createDecipheriv } from 'crypto';
 

@ApiTags('dev')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

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
    return {data: encrypted.toString('hex')}
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
