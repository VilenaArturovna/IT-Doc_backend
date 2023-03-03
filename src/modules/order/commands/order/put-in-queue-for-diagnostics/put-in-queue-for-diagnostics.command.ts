import { CommandBase } from '@libs/base-classes';

export class PutInQueueForDiagnosticsCommand extends CommandBase<{
  id: string;
}> {}
