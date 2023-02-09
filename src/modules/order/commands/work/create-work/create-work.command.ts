import { CommandBase } from '@libs/base-classes';
import { CreateWorkRequestDto } from './create-work.request.dto';

export class CreateWorkCommand extends CommandBase<CreateWorkRequestDto> {}
