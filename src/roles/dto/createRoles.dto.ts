import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createRoleDto {
  @ApiProperty({ example: 'ADMIN', description: ':(' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({ example: 'Qo`shimcha ma`lumotlar', description: 'Smts :)' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
