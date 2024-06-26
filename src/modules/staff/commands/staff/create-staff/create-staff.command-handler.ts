import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { DateVO, PhoneVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { StaffEntity } from '@modules/staff/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateStaffCommand } from './create-staff.command';

@CommandHandler(CreateStaffCommand)
export class CreateStaffCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  StaffEntity
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateStaffCommand,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    const { payload, trxId } = command;

    const repository = this.unitOfWork.getStaffRepository(trxId);

    const existedTgUsernameResult = await repository.getOneByTgId(payload.tgId);
    if (!existedTgUsernameResult.isErr) {
      return Result.fail(
        new ConflictException('Пользователь уже существует в системе'),
      );
    }

    const existedPhoneResult = await repository.getOneByPhone(
      new PhoneVO(payload.phone),
    );
    if (!existedPhoneResult.isErr) {
      return Result.fail(
        new ConflictException('Телефонный номер уже используется в системе'),
      );
    }

    const newStaff = StaffEntity.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      phone: new PhoneVO(payload.phone),
      role: payload.role,
      birthdate: payload.birthdate ? new DateVO(payload.birthdate) : undefined,
      isRemoved: false,
      tgId: payload.tgId,
      middleName: payload.middleName,
      isFirstEntrance: true,
    });

    return repository.create(newStaff);
  }
}
