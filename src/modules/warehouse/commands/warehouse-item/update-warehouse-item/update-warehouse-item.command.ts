import { CommandBase } from '@libs/base-classes';

import { UpdateWarehouseItemRequestDto } from './update-warehouse-item.request.dto';

export class UpdateWarehouseItemCommand extends CommandBase<
  UpdateWarehouseItemRequestDto & { id: string }
> {}
