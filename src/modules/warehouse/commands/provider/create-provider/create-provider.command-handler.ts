import { CommandHandler } from '@nestjs/cqrs';
import { CreateProviderCommand } from './create-provider.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { ProviderEntity } from '@modules/warehouse/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(CreateProviderCommand)
export class CreateProviderCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  ProviderEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateProviderCommand,
  ): Promise<Result<ProviderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { title, description },
    } = command;

    const repository = this.unitOfWork.getProviderRepository(trxId);

    const existedProviderResult = await repository.getOneByTitle(title);

    if (!existedProviderResult.isErr) {
      return Result.fail(
        new ConflictException('Поставщик с таким названием уже существует'),
      );
    }

    const provider = ProviderEntity.create({
      title,
      description,
    });

    return repository.create(provider);
  }
}
