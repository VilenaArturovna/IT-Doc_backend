import { CommandHandler } from '@nestjs/cqrs';
import { RemoveVendorCommand } from './remove-vendor.command';
import { VendorObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveVendorCommand)
export class RemoveVendorCommandHandler {
  constructor(private readonly repository: VendorObjectionRepository) {}

  async execute(
    command: RemoveVendorCommand,
  ): Promise<Result<void, ExceptionBase>> {
    return this.repository.remove(new UuidVO(command.payload.id));
  }
}
