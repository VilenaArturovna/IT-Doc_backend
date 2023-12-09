import { PaginationRequestDto } from '@libs/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces } from '@src/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetManyStaffRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  search?: string;
}
