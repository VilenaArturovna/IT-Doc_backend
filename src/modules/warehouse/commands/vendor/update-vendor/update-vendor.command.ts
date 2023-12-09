import { CommandBase } from '@libs/base-classes';

import { UpdateVendorRequestDto } from './update-vendor.request.dto';

export class UpdateVendorCommand extends CommandBase<
  UpdateVendorRequestDto & { id: string }
> {}
