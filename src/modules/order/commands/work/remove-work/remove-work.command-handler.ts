import { CommandHandler } from '@nestjs/cqrs';
import { RemoveWorkCommand } from './remove-work.command';
import { WorkObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveWorkCommand)
export class RemoveWorkCommandHandler {
  constructor(private readonly repository: WorkObjectionRepository) {}

  async execute(
    command: RemoveWorkCommand,
  ): Promise<Result<void, ExceptionBase>> {
    //todo: добавить проверку, существуют ли заказы с этой работой

    return this.repository.remove(new UuidVO(command.payload.id));
  }
}
