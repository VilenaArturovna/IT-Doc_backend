import { CommandHandler } from '@nestjs/cqrs';
import { RemoveVendorCommand } from './remove-vendor.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(RemoveVendorCommand)
export class RemoveVendorCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  void
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveVendorCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getVendorRepository(command.trxId);

    return repository.remove(new UuidVO(command.payload.id));
  }
}
