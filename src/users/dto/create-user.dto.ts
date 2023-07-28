import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi paroli' })
  // @IsStrongPassword({ minLength: 6 })
  password: string;
}
