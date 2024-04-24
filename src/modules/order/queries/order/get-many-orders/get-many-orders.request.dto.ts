import { PaginationWithSortingRequestDto } from '@libs/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransformToBooleanDecorator } from '@src/common';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetManyOrdersRequestDto extends PaginationWithSortingRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBooleanDecorator()
  @IsBoolean()
  isActive?: boolean;
}
