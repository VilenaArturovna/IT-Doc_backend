import { CommandBase } from '@libs/base-classes';
import { PutInQueueForDiagnosticsRequestDto } from './put-in-queue-for-diagnostics.request.dto';

export class PutInQueueForDiagnosticsCommand extends CommandBase<
  PutInQueueForDiagnosticsRequestDto & { id: string }
> {}
