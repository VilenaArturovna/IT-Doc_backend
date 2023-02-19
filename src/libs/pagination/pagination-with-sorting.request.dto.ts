import { PaginationRequestDto } from '@libs/pagination/pagination.request.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationWithSortingRequestDto<
  SortField extends string = string,
> extends PaginationRequestDto {
  @ApiPropertyOptional({ enum: OrderType, enumName: 'OrderType' })
  @IsOptional()
  @IsEnum(OrderType)
  order?: OrderType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort?: SortField;
}
