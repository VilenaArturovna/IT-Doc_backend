import { CommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from './update-client.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ConflictException } from '@libs/exceptions';
import { EmailVO, PhoneVO, UuidVO } from '@libs/value-objects';
import { ClientEntity } from '@modules/order/domain';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(UpdateClientCommand)
export class UpdateClientCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  ClientEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateClientCommand,
  ): Promise<Result<ClientEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, name, ...payload },
    } = command;

    const repository = this.unitOfWork.getClientRepository(trxId);

    const clientResult = await repository.getOneById(new UuidVO(id));
    const client = clientResult.unwrap();

    const existedClientResult = await repository.getOneByName(name);
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

    return repository.update(client);
  }
}
