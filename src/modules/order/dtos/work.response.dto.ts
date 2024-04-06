import { WorkEntity } from '@modules/order/domain';
import { ApiProperty } from '@nestjs/swagger';

export class WorkResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

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
