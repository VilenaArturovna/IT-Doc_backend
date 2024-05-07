import { CommandBase } from '@libs/base-classes';

export class TakeTaskToWorkCommand extends CommandBase<{
  id: string;
  staffId: string;
}> {}
