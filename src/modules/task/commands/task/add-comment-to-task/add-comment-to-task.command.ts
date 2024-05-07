import { CommandBase } from '@libs/base-classes';

import { AddCommentToTaskRequestDto } from './add-comment-to-task.request.dto';

export class AddCommentToTaskCommand extends CommandBase<
  AddCommentToTaskRequestDto & { staffId: string; id: string }
> {}
