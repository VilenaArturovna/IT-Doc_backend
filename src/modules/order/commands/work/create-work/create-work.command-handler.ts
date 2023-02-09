import { CommandHandler } from '@nestjs/cqrs';
import { CreateWorkCommand } from './create-work.command';
import { WorkObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { WorkEntity } from '@modules/order/domain';
import { Currency, MoneyVO } from '@libs/value-objects';

@CommandHandler(CreateWorkCommand)
export class CreateWorkCommandHandler {
  constructor(private readonly repository: WorkObjectionRepository) {}

  async execute(
    command: CreateWorkCommand,
  ): Promise<Result<WorkEntity, ExceptionBase>> {
    const { price, name, time } = command.payload;

    const existedWorkResult = await this.repository.getWorkByName(name);
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
      price: MoneyVO.toVO({ amount: price, currency: Currency.RUR }),
    });

    return this.repository.create(work);
  }
}
