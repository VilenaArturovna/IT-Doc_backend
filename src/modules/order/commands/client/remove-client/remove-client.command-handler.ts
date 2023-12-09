import { CommandHandler } from '@nestjs/cqrs';
import { RemoveClientCommand } from './remove-client.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(RemoveClientCommand)
export class RemoveClientCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  void
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveClientCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getClientRepository(command.trxId);
    //todo check using client
    return repository.remove(new UuidVO(command.payload.id));
  }
}
