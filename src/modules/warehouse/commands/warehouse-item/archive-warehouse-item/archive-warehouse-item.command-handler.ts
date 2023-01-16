import { CommandHandler } from '@nestjs/cqrs';
import { ArchiveWarehouseItemCommand } from './archive-warehouse-item.command';
import { WarehouseItemObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

@CommandHandler(ArchiveWarehouseItemCommand)
export class ArchiveWarehouseItemCommandHandler {
  constructor(private readonly repository: WarehouseItemObjectionRepository) {}

  async execute(
    command: ArchiveWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const itemResult = await this.repository.getOneById(
      new UuidVO(command.payload.id),
    );
    const item = itemResult.unwrap();

    item.archive();

    return this.repository.update(item);
  }
}
