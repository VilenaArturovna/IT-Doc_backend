import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequestDto } from '@libs/pagination';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetManyServicesRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
