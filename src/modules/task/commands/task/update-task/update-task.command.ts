import { CommandBase } from '@libs/base-classes';

import { UpdateTaskRequestDto } from './update-task.request.dto';

export class UpdateTaskCommand extends CommandBase<
  UpdateTaskRequestDto & { id: string; staffId: string }
> {}
