import { NestFactory } from '@nestjs/core';
import { ValidationPipe,VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder,SwaggerDocumentOptions } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { EncryptionInterceptor } from './common/interceptor/encryption.interceptor';
import {appOptions} from './common/config/log-config'
import  helmet from 'helmet';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,appOptions);
  app.use(helmet());
  app.use(helmet.hidePoweredBy())
  app.useGlobalInterceptors(new EncryptionInterceptor());
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
});
  const config = new DocumentBuilder()
    .setTitle('CMS Users')
    .setDescription('CMS Users Microservices')
    .setVersion('1.0')
    // .addTag('Auth').addTag("CMS")
    .build();
  //   const options: SwaggerDocumentOptions = {
  //     include?: Function[UsersModule];
  // };
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, document);
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'cats_queue',
  //       queueOptions: {
  //         durable: false
  //       },
  //     },
  //   },
  // );
  // await app.listen();
}
bootstrap();
