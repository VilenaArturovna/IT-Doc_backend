import { CommandBase } from '@libs/base-classes';

import { UpdateWorkRequestDto } from './update-work.request.dto';

export class UpdateWorkCommand extends CommandBase<
  UpdateWorkRequestDto & { id: string }
> {}
