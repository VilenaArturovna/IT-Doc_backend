import { CommandHandler } from '@nestjs/cqrs';
import { UpdateProviderCommand } from './update-provider.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { UuidVO } from '@libs/value-objects';
import { ProviderEntity } from '@modules/warehouse/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

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
