import { CommandBase } from '@libs/base-classes';

import { UpdateOrderRequestDto } from './update-order.request.dto';

export class UpdateOrderCommand extends CommandBase<
  UpdateOrderRequestDto & { id: string }
> {}
