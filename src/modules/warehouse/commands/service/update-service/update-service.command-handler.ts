import { CommandHandler } from '@nestjs/cqrs';
import { UpdateServiceCommand } from './update-service.command';
import { ServiceObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { Currency, MoneyVO, UuidVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';
import { ServiceEntity } from '@modules/warehouse/domain';

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceCommandHandler {
  constructor(private readonly repository: ServiceObjectionRepository) {}

  async execute(
    command: UpdateServiceCommand,
  ): Promise<Result<ServiceEntity, ExceptionBase>> {
    const { id, title, description, cost } = command.payload;

    const serviceResult = await this.repository.getOneById(new UuidVO(id));
    const service = serviceResult.unwrap();

    const existedServiceResult = await this.repository.getOneByTitle(title);

    if (
      !existedServiceResult.isErr &&
      existedServiceResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Услуга с таким названием уже существует'),
      );
    }

    service.update({
      title,
      description,
      cost: MoneyVO.toVO({ amount: cost, currency: Currency.RUR }),
    });

    return this.repository.update(service);
  }
}
