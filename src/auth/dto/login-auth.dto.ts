import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'kimdir@gmail.com', description: 'Shunchaki email' })
  readonly email: string;

  @ApiProperty({ example: 'Uzbek1$t@n', description: 'Password' })
  readonly password: string;
}
