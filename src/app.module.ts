import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ormConfig } from './database/config/ormconfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import Users  from './users/entities/user.entity';
import {AppLoggerMiddleware} from './common/middleware/logger.middleware'
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forFeature([Users]),TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    database: process.env.DATABASE_NAME,
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    // ssl: true,
    // useUnifiedTopology: true,
    // useNewUrlParser: true
  }), AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}