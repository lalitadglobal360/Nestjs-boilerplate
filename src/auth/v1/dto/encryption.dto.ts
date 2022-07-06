import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class encryptionDto {
  [key: string]: string;
  }
   
  export default encryptionDto;
