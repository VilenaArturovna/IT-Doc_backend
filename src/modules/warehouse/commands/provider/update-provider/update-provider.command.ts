import { CommandBase } from '@libs/base-classes';

import { UpdateProviderRequestDto } from './update-provider.request.dto';

export class UpdateProviderCommand extends CommandBase<
  UpdateProviderRequestDto & { id: string }
> {}
