import { OrderStageEntity } from '@modules/order/domain';
import { OrderStatus } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderStageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  number: number;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @ApiPropertyOptional()
  deadline?: string;

  @ApiPropertyOptional()
  completedAt?: string;

  @ApiPropertyOptional()
  comment?: string;

  constructor(entity: OrderStageEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.createdAt = props.createdAt.ISOString;
    this.updatedAt = props.updatedAt.ISOString;
    this.completedAt = props.completedAt?.ISOString;
    this.status = props.status;
    this.number = props.number;
    this.deadline = props.deadline?.ISOString;
    this.comment = props.comment;
  }
}
