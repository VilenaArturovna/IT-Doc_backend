import { CommandBase } from '@libs/base-classes';
import { CreateVendorRequestDto } from './create-vendor.request.dto';

export class CreateVendorCommand extends CommandBase<CreateVendorRequestDto> {}
