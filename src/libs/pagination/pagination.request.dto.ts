import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationRequestDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;
}
