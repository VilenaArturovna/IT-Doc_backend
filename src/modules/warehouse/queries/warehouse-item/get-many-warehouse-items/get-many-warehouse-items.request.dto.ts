import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequestDto } from '@libs/pagination';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransformToBooleanDecorator } from '@src/common';

export class GetManyWarehouseItemsRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBooleanDecorator()
  @IsBoolean()
  isArchived?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBooleanDecorator()
  @IsBoolean()
  isExactMatch?: boolean;
}
