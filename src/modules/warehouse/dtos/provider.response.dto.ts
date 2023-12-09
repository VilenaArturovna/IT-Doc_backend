import { ProviderEntity } from '@modules/warehouse/domain';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string;

  constructor(entity: ProviderEntity) {
    const props = entity.getCopiedProps();
    this.id = props.id.value;
    this.title = props.title;
    this.description = props.description;
  }
}
