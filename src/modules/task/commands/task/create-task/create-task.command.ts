import { CommandBase } from '@libs/base-classes';

import { CreateTaskRequestDto } from './create-task.request.dto';

export class CreateTaskCommand extends CommandBase<
  CreateTaskRequestDto & { authorId: string }
> {}
