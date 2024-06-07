import { PaginationRequestDto } from '@libs/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransformToBooleanDecorator } from '@src/common';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetManyOrdersRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBooleanDecorator()
  @IsBoolean()
  isActive?: boolean;
}
