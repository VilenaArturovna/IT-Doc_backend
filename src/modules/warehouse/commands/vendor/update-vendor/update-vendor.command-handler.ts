import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';
import { VendorEntity } from '@modules/warehouse/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateVendorCommand } from './update-vendor.command';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  VendorEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateVendorCommand,
  ): Promise<Result<VendorEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, title, description },
    } = command;

    const repository = this.unitOfWork.getVendorRepository(trxId);

    const vendorResult = await repository.getOneById(new UuidVO(id));
    const vendor = vendorResult.unwrap();

    const existedVendorResult = await repository.getOneByTitle(title);

    if (
      !existedVendorResult.isErr &&
      existedVendorResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Продавец с таким названием уже существует'),
      );
    }

    vendor.update({ title, description });

    return repository.update(vendor);
  }
}
