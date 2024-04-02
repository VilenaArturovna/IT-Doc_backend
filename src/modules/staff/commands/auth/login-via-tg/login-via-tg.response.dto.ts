import { StaffResponseDto } from '@modules/staff/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class LoginViaTgResponseDto extends StaffResponseDto {
  @ApiProperty()
  token: string;
}
