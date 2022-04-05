import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
