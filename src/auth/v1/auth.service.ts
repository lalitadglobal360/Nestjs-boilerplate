import { Injectable,UnauthorizedException  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/v1/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtTokenService: JwtService){}

    async validateUserCredentials(username:string,password:string): Promise<any> {
        const name = {email:username}
        const user = await this.usersService.findUser(name);
        console.log(user)
        if(!user){
            
            throw new UnauthorizedException();
        }
        const ispasswordMatch:boolean = bcrypt.compare(password, user.password);
        if (ispasswordMatch) {
            const payload = { username: user.name, sub: user.id };

            return {
                access_token: this.jwtTokenService.sign(payload),
            };
        }
         throw new UnauthorizedException();
    }

    async loginWithCredentials(user: any) {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtTokenService.sign(payload),
        };
    }
}