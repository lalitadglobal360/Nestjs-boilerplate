import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
//import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: ""+process.env.JWT_SECRET,
      signOptions: {expiresIn: '60s'}
    })],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}