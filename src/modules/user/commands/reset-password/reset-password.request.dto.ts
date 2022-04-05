import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsString()
  resetPasswordHash: string;

  @ApiProperty()
  @IsString()
  password: string;
}
