import { ApiProperty } from '@nestjs/swagger';
import { WorkEntity } from '@modules/order/domain';

export class WorkResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  time: number;

  constructor(entity: WorkEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.name = props.name;
    this.price = props.price.amount;
    this.time = props.time;
  }
}
