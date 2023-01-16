import { CommandBase } from '@libs/base-classes';
import { CreateStaffRequestDto } from './create-staff.request.dto';

export class CreateStaffCommand extends CommandBase<CreateStaffRequestDto> {}
