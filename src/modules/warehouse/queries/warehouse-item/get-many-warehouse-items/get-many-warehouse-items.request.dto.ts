import { PaginationRequestDto } from '@libs/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransformToBooleanDecorator } from '@src/common';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
