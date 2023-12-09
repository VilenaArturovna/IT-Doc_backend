import { CommandHandler } from '@nestjs/cqrs';
import { ArchiveWarehouseItemCommand } from './archive-warehouse-item.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(ArchiveWarehouseItemCommand)
export class ArchiveWarehouseItemCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  WarehouseItemEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: ArchiveWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const warehouseItemRepository = this.unitOfWork.getWarehouseItemRepository(
      command.trxId,
    );

    const itemResult = await warehouseItemRepository.getOneById(
      new UuidVO(command.payload.id),
    );
    const item = itemResult.unwrap();

    item.archive();

    return warehouseItemRepository.update(item);
  }
}
