import { CommandBase } from '@libs/base-classes';
import { CreateWarehouseItemRequestDto } from './create-warehouse-item.request.dto';

export class CreateWarehouseItemCommand extends CommandBase<CreateWarehouseItemRequestDto> {}
