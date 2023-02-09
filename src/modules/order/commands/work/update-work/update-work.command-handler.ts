import { CommandHandler } from '@nestjs/cqrs';
import { UpdateWorkCommand } from './update-work.command';
import { WorkObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { Currency, MoneyVO, UuidVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';
import { WorkEntity } from '@modules/order/domain';

@CommandHandler(UpdateWorkCommand)
export class UpdateWorkCommandHandler {
  constructor(private readonly repository: WorkObjectionRepository) {}

  async execute(
    command: UpdateWorkCommand,
  ): Promise<Result<WorkEntity, ExceptionBase>> {
    const { price, id, time, name } = command.payload;

    const workResult = await this.repository.getOneById(new UuidVO(id));
    const work = workResult.unwrap();

    const existedWorkResult = await this.repository.getWorkByName(name);
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
      price: MoneyVO.toVO({ amount: price, currency: Currency.RUR }),
    });

    return this.repository.update(work);
  }
}
