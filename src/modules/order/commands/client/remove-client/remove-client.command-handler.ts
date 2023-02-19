import { CommandHandler } from '@nestjs/cqrs';
import { RemoveClientCommand } from './remove-client.command';
import { ClientObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveClientCommand)
export class RemoveClientCommandHandler {
  constructor(private readonly repository: ClientObjectionRepository) {}

  async execute(
    command: RemoveClientCommand,
  ): Promise<Result<void, ExceptionBase>> {
    //todo check using client
    return this.repository.remove(new UuidVO(command.payload.id));
  }
}
