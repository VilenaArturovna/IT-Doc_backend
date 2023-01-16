import { CommandHandler } from '@nestjs/cqrs';
import { UpdateVendorCommand } from './update-vendor.command';
import { VendorObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';
import { VendorEntity } from '@modules/warehouse/domain';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorCommandHandler {
  constructor(private readonly repository: VendorObjectionRepository) {}

  async execute(
    command: UpdateVendorCommand,
  ): Promise<Result<VendorEntity, ExceptionBase>> {
    const { id, title, description } = command.payload;

    const vendorResult = await this.repository.getOneById(new UuidVO(id));
    const vendor = vendorResult.unwrap();

    const existedVendorResult = await this.repository.getOneByTitle(title);

    if (
      !existedVendorResult.isErr &&
      existedVendorResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Продавец с таким названием уже существует'),
      );
    }

    vendor.update({ title, description });

    return this.repository.update(vendor);
  }
}
