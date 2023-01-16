import { CommandBase } from '@libs/base-classes';
import { CreateServiceRequestDto } from './create-service.request.dto';

export class CreateServiceCommand extends CommandBase<CreateServiceRequestDto> {}
