import { CommandHandler } from '@nestjs/cqrs';
import { RemoveProviderCommand } from './remove-provider.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(RemoveProviderCommand)
export class RemoveProviderCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  void
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveProviderCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getProviderRepository(command.trxId);

    return repository.remove(new UuidVO(command.payload.id));
  }
}
