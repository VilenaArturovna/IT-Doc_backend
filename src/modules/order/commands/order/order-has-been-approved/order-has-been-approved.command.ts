import { CommandBase } from '@libs/base-classes';

import { OrderHasBeenApprovedRequestDto } from './order-has-been-approved.request.dto';

export class OrderHasBeenApprovedCommand extends CommandBase<
  OrderHasBeenApprovedRequestDto & { id: string }
> {}
