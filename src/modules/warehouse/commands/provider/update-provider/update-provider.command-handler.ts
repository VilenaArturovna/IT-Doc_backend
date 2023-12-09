import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';
import { ProviderEntity } from '@modules/warehouse/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateProviderCommand } from './update-provider.command';

@CommandHandler(UpdateProviderCommand)
export class UpdateProviderCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  ProviderEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateProviderCommand,
  ): Promise<Result<ProviderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, title, description },
    } = command;

    const repository = this.unitOfWork.getProviderRepository(trxId);

    const providerResult = await repository.getOneById(new UuidVO(id));
    const provider = providerResult.unwrap();

    const existedProviderResult = await repository.getOneByTitle(title);

    if (
      !existedProviderResult.isErr &&
      existedProviderResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Поставщик с таким названием уже существует'),
      );
    }

    provider.update({ title, description });

    return repository.update(provider);
  }
}
