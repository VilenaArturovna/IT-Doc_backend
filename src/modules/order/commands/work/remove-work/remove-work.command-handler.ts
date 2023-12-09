import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';

import { RemoveWorkCommand } from './remove-work.command';

@CommandHandler(RemoveWorkCommand)
export class RemoveWorkCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  void
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveWorkCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getWorkRepository(command.trxId);
    //todo: добавить проверку, существуют ли заказы с этой работой

    return repository.remove(new UuidVO(command.payload.id));
  }
}
