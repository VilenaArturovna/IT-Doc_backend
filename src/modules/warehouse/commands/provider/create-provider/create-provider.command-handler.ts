import { CommandHandler } from '@nestjs/cqrs';
import { CreateProviderCommand } from './create-provider.command';
import { ProviderObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { ProviderEntity } from '@modules/warehouse/domain';

@CommandHandler(CreateProviderCommand)
export class CreateProviderCommandHandler {
  constructor(private readonly repository: ProviderObjectionRepository) {}

  async execute(
    command: CreateProviderCommand,
  ): Promise<Result<ProviderEntity, ExceptionBase>> {
    const { title, description } = command.payload;

    const existedProviderResult = await this.repository.getOneByTitle(title);

    if (!existedProviderResult.isErr) {
      return Result.fail(
        new ConflictException('Поставщик с таким названием уже существует'),
      );
    }

    const provider = ProviderEntity.create({
      title,
      description,
    });

    return this.repository.create(provider);
  }
}
