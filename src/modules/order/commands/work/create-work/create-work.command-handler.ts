import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { MoneyVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { WorkEntity } from '@modules/order/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateWorkCommand } from './create-work.command';

@CommandHandler(CreateWorkCommand)
export class CreateWorkCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  WorkEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateWorkCommand,
  ): Promise<Result<WorkEntity, ExceptionBase>> {
    const { price, name, time } = command.payload;

    const repository = this.unitOfWork.getWorkRepository(command.trxId);

    const existedWorkResult = await repository.getWorkByName(name);
    if (!existedWorkResult.isErr) {
      return Result.fail(
        new ConflictException(
          'Работа с таким названием и приоритетом уже существует',
        ),
      );
    }

    const work = WorkEntity.create({
      name,
      time,
      price: MoneyVO.toVO({ amount: price }),
    });

    return repository.create(work);
  }
}
