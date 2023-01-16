import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceEntity } from '@modules/warehouse/domain';

export class ServiceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;

  @ApiProperty()
  cost: number;

  constructor(entity: ServiceEntity) {
    const props = entity.getCopiedProps();
    this.id = props.id.value;
    this.title = props.title;
    this.description = props.description;
    this.cost = props.cost.amount;
  }
}
