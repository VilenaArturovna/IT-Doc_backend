import { CommandBase } from '@libs/base-classes';

import { OrderHasBeenDiagnosedRequestDto } from './order-has-been-diagnosed.request.dto';

export class OrderHasBeenDiagnosedCommand extends CommandBase<
  OrderHasBeenDiagnosedRequestDto & { id: string }
> {}
