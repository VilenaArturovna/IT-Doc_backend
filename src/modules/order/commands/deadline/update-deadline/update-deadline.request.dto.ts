import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateDeadlineRequestDto {
  @ApiProperty()
  @IsPositive()
  @IsInt()
  normal: number;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  urgent: number;
}
