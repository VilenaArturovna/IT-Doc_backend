import { CommandBase } from '@libs/base-classes';
import { CreateOrderRequestDto } from './create-order.request.dto';

export class CreateOrderCommand extends CommandBase<CreateOrderRequestDto> {}
