import { CommandBase } from '@libs/base-classes';
import { CreateClientRequestDto } from './create-client.request.dto';

export class CreateClientCommand extends CommandBase<CreateClientRequestDto> {}
