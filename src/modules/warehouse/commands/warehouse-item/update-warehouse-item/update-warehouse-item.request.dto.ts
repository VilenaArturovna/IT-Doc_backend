import { CreateWarehouseItemRequestDto } from '@modules/warehouse/commands/warehouse-item';
import { OmitType } from '@nestjs/swagger';

export class UpdateWarehouseItemRequestDto extends OmitType(
  CreateWarehouseItemRequestDto,
  ['section', 'unit'],
) {}
