import { CommandHandler } from '@nestjs/cqrs';
import { UpdateWorkCommand } from './update-work.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { Currency, MoneyVO, UuidVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';
import { WorkEntity } from '@modules/order/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

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
      price: MoneyVO.toVO({ amount: price, currency: Currency.RUB }),
    });

    return repository.update(work);
  }
}
