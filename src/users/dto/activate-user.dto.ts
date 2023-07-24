import { ApiProperty } from '@nestjs/swagger';

export class ActivateUserDto {
  @ApiProperty({
    example: 1,
    description: "Active qilmochi bo'lgan userning 'id'si",
  })
  readonly userId: number;
}
