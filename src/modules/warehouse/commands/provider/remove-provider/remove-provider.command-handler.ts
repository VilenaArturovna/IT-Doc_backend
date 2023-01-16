import { CommandHandler } from '@nestjs/cqrs';
import { RemoveProviderCommand } from './remove-provider.command';
import { ProviderObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveProviderCommand)
export class RemoveProviderCommandHandler {
  constructor(private readonly repository: ProviderObjectionRepository) {}

  async execute(
    command: RemoveProviderCommand,
  ): Promise<Result<void, ExceptionBase>> {
    return this.repository.remove(new UuidVO(command.payload.id));
  }
}
