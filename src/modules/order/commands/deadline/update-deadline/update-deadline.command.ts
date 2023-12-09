import { CommandBase } from '@libs/base-classes';

import { UpdateDeadlineRequestDto } from './update-deadline.request.dto';

export class UpdateDeadlineCommand extends CommandBase<
  UpdateDeadlineRequestDto & { id: string }
> {}
