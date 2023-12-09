import { CommandBase } from '@libs/base-classes';

import { UpdateStaffRequestDto } from './update-staff.request.dto';

export class UpdateStaffCommand extends CommandBase<
  UpdateStaffRequestDto & { id: string }
> {}
