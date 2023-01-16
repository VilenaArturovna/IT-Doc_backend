import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VendorEntity } from '@modules/warehouse/domain';

export class VendorResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;

  constructor(entity: VendorEntity) {
    const props = entity.getCopiedProps();
    this.id = props.id.value;
    this.title = props.title;
    this.description = props.description;
  }
}
