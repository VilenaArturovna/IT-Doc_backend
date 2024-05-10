import { CommandBase } from '@libs/base-classes';

export class MarkTaskAsReadCommand extends CommandBase<{
  id: string;
  staffId: string;
}> {}
