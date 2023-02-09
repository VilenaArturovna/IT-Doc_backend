import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequestDto } from '@libs/pagination';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetManyWorksRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}
