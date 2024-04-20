import { CommandBase } from '@libs/base-classes';

import { OrderReadyRequestDto } from './order-ready.request.dto';

export class OrderReadyCommand extends CommandBase<
  OrderReadyRequestDto & { id: string }
> {}
