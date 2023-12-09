import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { EmailVO, PhoneVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { ClientEntity } from '@modules/order/domain';
import { Beneficiary, ClientType } from '@modules/order/types';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateClientCommand } from './create-client.command';

@CommandHandler(CreateClientCommand)
export class CreateClientCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  ClientEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateClientCommand,
  ): Promise<Result<ClientEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { name, ...payload },
    } = command;

    const repository = this.unitOfWork.getClientRepository(trxId);

    const existedClientResult = await repository.getOneByName(name);
    if (!existedClientResult.isErr) {
      return Result.fail(
        new ConflictException('Клиент с таким именем/названием уже существует'),
      );
    }

    const client = ClientEntity.create({
      name,
      INN: payload.INN,
      directorName: payload.directorName,
      BIK: payload.BIK,
      KPP: payload.KPP,
      actualAddress: payload.actualAddress,
      legalAddress: payload.legalAddress,
      correspondentAccount: payload.correspondentAccount,
      fullName: payload.fullName,
      paymentAccount: payload.paymentAccount,
      OGRN: payload.OGRN,
      contactPersonPhone: payload.contactPersonPhone
        ? new PhoneVO(payload.contactPersonPhone)
        : undefined,
      contactPerson: payload.contactPerson,
      email: payload.email ? new EmailVO(payload.email) : undefined,
      type: payload.type || ClientType.PHYSICAL_PERSON,
      phone: new PhoneVO(payload.phone),
      beneficiary: payload.beneficiary || Beneficiary.IP,
    });

    return repository.create(client);
  }
}
