import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { WorkEntity } from '@modules/order/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateWorkCommand } from './update-work.command';

@CommandHandler(UpdateWorkCommand)
export class UpdateWorkCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  WorkEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateWorkCommand,
  ): Promise<Result<WorkEntity, ExceptionBase>> {
    const { price, id, time, name } = command.payload;

    const repository = this.unitOfWork.getWorkRepository(command.trxId);

    const workResult = await repository.getOneById(new UuidVO(id));
    const work = workResult.unwrap();

    const existedWorkResult = await repository.getWorkByName(name);
    if (
      !existedWorkResult.isErr &&
      !existedWorkResult.unwrap().id.equals(work.id)
    ) {
      return Result.fail(
        new ConflictException(
          'Работа с таким названием и приоритетом уже существует',
        ),
      );
    }

    work.update({
      name,
      time,
      price: MoneyVO.toVO({ amount: price }),
    });

    return repository.update(work);
  }
}
