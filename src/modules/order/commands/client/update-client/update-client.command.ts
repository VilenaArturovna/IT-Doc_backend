import { CommandBase } from '@libs/base-classes';

import { UpdateClientRequestDto } from './update-client.request.dto';

export class UpdateClientCommand extends CommandBase<
  UpdateClientRequestDto & { id: string }
> {}
