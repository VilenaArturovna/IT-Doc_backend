import { OrderStatus } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class OrderHasBeenApprovedRequestDto {
  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  @IsDefined()
  @ValidateIf(
    (object: OrderHasBeenApprovedRequestDto) =>
      object.status === OrderStatus.APPROVED_AND_SPARE_PART_IS_ORDERED,
  )
  deadlineDate?: string;
}
