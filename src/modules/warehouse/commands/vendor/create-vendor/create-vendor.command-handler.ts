import { CommandHandler } from '@nestjs/cqrs';
import { CreateVendorCommand } from './create-vendor.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { VendorEntity } from '@modules/warehouse/domain';
import { ConflictException } from '@libs/exceptions';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(CreateVendorCommand)
export class CreateVendorCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  VendorEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateVendorCommand,
  ): Promise<Result<VendorEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { title, description },
    } = command;

    const repository = this.unitOfWork.getVendorRepository(trxId);

    const existedVendorResult = await repository.getOneByTitle(title);

    if (!existedVendorResult.isErr) {
      return Result.fail(
        new ConflictException('Продавец с таким названием уже существует'),
      );
    }

    const vendorEntity = VendorEntity.create({
      title,
      description,
    });

    return repository.create(vendorEntity);
  }
}
