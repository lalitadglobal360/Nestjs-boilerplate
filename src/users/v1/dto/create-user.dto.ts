import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from "class-validator";
// @ApiParam({name: 'name', required: true, description: 'user email id'})
  // @ApiParam({name: 'email', required: true, description: 'user email id'})
  // @ApiParam({name: 'password', required: true, description: 'user password'})
  export class CreateUserDto {
    @IsEmail()
    email: string;
    @ApiProperty({
      deprecated: true,
      description: 'Use the name property instead'
    })

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    password: string;
  }
   
  export default CreateUserDto;
