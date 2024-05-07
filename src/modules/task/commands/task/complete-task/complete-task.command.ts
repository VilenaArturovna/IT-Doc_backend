import { CommandBase } from '@libs/base-classes';

export class CompleteTaskCommand extends CommandBase<{
  staffId: string;
  id: string;
}> {}
