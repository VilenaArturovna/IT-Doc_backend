import { CommandHandler } from '@nestjs/cqrs';
import { CreateServiceCommand } from './create-service.command';
import { ServiceObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { ServiceEntity } from '@modules/warehouse/domain';
import { Currency, MoneyVO } from '@libs/value-objects';

@CommandHandler(CreateServiceCommand)
export class CreateServiceCommandHandler {
  constructor(private readonly repository: ServiceObjectionRepository) {}

  async execute(
    command: CreateServiceCommand,
  ): Promise<Result<ServiceEntity, ExceptionBase>> {
    const { title, description, cost } = command.payload;

    const existedServiceResult = await this.repository.getOneByTitle(title);

    if (!existedServiceResult.isErr) {
      return Result.fail(
        new ConflictException('Услуга с таким названием уже существует'),
      );
    }

    const serviceEntity = ServiceEntity.create({
      title,
      description,
      cost: MoneyVO.toVO({ amount: cost, currency: Currency.RUR }),
    });

    return this.repository.create(serviceEntity);
  }
}
