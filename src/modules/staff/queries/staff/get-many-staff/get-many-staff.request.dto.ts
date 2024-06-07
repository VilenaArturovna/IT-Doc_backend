import { PaginationRequestDto } from '@libs/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces, TransformToBooleanDecorator } from '@src/common';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetManyStaffRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBooleanDecorator()
  @IsBoolean()
  isActive?: boolean;
}
