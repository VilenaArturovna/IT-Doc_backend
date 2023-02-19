import { CommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './create-client.command';
import { ClientObjectionRepository } from '@modules/order/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { ClientEntity } from '@modules/order/domain';
import { EmailVO, PhoneVO } from '@libs/value-objects';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ConflictException } from '@libs/exceptions';

@CommandHandler(CreateClientCommand)
export class CreateClientCommandHandler {
  constructor(private readonly repository: ClientObjectionRepository) {}

  async execute(
    command: CreateClientCommand,
  ): Promise<Result<ClientEntity, ExceptionBase>> {
    const { name, ...payload } = command.payload;

    const existedClientResult = await this.repository.getOneByName(name);
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

    return this.repository.create(client);
  }
}
