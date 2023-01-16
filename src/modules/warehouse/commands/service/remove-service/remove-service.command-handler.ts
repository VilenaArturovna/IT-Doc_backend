import { CommandHandler } from '@nestjs/cqrs';
import { RemoveServiceCommand } from './remove-service.command';
import { ServiceObjectionRepository } from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveServiceCommand)
export class RemoveServiceCommandHandler {
  constructor(private readonly repository: ServiceObjectionRepository) {}

  async execute(
    command: RemoveServiceCommand,
  ): Promise<Result<void, ExceptionBase>> {
    return this.repository.remove(new UuidVO(command.payload.id));
  }
}
