import { CommandBase } from '@libs/base-classes';
import { UpdateServiceRequestDto } from './update-service.request.dto';

export class UpdateServiceCommand extends CommandBase<
  UpdateServiceRequestDto & { id: string }
> {}
