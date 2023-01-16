import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequestDto } from '@libs/pagination';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsNotJustSpaces } from '@src/common';

export class GetManyStaffRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  search?: string;
}
