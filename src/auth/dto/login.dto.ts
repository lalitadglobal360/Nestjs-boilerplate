import { IsEmail, IsNotEmpty } from "class-validator";
export class loginDto {
    @IsEmail()
    username: string;

    data: any;
    iv: any;

    @IsNotEmpty()
    password: string;
  }
   
  export default loginDto;
