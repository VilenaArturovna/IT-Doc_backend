import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@modules/order/types';
import { DeadlineEntity } from '@modules/order/domain';

export class DeadlineResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: OrderStatus;

  @ApiProperty()
  normal: number;

  @ApiProperty()
  urgent: number;

  constructor(entity: DeadlineEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.name = props.name;
    this.normal = props.normal;
    this.urgent = props.urgent;
  }
}
