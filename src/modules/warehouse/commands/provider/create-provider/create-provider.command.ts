import { CommandBase } from '@libs/base-classes';
import { CreateProviderRequestDto } from './create-provider.request.dto';

export class CreateProviderCommand extends CommandBase<CreateProviderRequestDto> {}
