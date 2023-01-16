import { CommandHandler } from '@nestjs/cqrs';
import { UpdateProviderCommand } from './update-provider.command';
import { ProviderObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { UuidVO } from '@libs/value-objects';
import { ProviderEntity } from '@modules/warehouse/domain';

@CommandHandler(UpdateProviderCommand)
export class UpdateProviderCommandHandler {
  constructor(private readonly repository: ProviderObjectionRepository) {}

  async execute(
    command: UpdateProviderCommand,
  ): Promise<Result<ProviderEntity, ExceptionBase>> {
    const { id, title, description } = command.payload;

    const providerResult = await this.repository.getOneById(new UuidVO(id));
    const provider = providerResult.unwrap();

    const existedProviderResult = await this.repository.getOneByTitle(title);

    if (
      !existedProviderResult.isErr &&
      existedProviderResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Поставщик с таким названием уже существует'),
      );
    }

    provider.update({ title, description });

    return this.repository.update(provider);
  }
}
