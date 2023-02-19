import { CommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from './update-client.command';
import { ClientObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { EmailVO, PhoneVO, UuidVO } from '@libs/value-objects';
import { ClientEntity } from '@modules/order/domain';

@CommandHandler(UpdateClientCommand)
export class UpdateClientCommandHandler {
  constructor(private readonly repository: ClientObjectionRepository) {}

  async execute(
    command: UpdateClientCommand,
  ): Promise<Result<ClientEntity, ExceptionBase>> {
    const { id, name, ...payload } = command.payload;

    const clientResult = await this.repository.getOneById(new UuidVO(id));
    const client = clientResult.unwrap();

    const existedClientResult = await this.repository.getOneByName(name);
    if (
      !existedClientResult.isErr &&
      existedClientResult.unwrap().id.value !== id
    ) {
      return Result.fail(
        new ConflictException('Клиент с таким именем/названием уже существует'),
      );
    }

    client.update({
      ...payload,
      name,
      contactPersonPhone: payload.contactPersonPhone
        ? new PhoneVO(payload.contactPersonPhone)
        : undefined,
      phone: new PhoneVO(payload.phone),
      email: payload.email ? new EmailVO(payload.email) : undefined,
      beneficiary: payload.beneficiary ?? client.beneficiary,
    });

    return this.repository.update(client);
  }
}
