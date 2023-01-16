import { CommandHandler } from '@nestjs/cqrs';
import { CreateVendorCommand } from './create-vendor.command';
import { VendorObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { VendorEntity } from '@modules/warehouse/domain';
import { ConflictException } from '@libs/exceptions';

@CommandHandler(CreateVendorCommand)
export class CreateVendorCommandHandler {
  constructor(private readonly repository: VendorObjectionRepository) {}

  async execute(
    command: CreateVendorCommand,
  ): Promise<Result<VendorEntity, ExceptionBase>> {
    const { title, description } = command.payload;

    const existedVendorResult = await this.repository.getOneByTitle(title);

    if (!existedVendorResult.isErr) {
      return Result.fail(
        new ConflictException('Продавец с таким названием уже существует'),
      );
    }

    const vendorEntity = VendorEntity.create({
      title,
      description,
    });

    return this.repository.create(vendorEntity);
  }
}
