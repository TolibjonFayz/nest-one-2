import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    example: 1,
    description: "Role bermoqchi bo'gan usernig 'id'si",
  })
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: "I don't know waht to say..." })
  readonly value: string;
}
