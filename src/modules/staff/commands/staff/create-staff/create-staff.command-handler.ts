import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException } from '@libs/exceptions';
import { generatePassword, Result } from '@libs/utils';
import { DateVO, EmailVO, HashPasswordVO, PhoneVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { StaffEntity } from '@modules/staff/domain';
import { CommandHandler } from '@nestjs/cqrs';
import { MailService } from '@src/common';

import { CreateStaffCommand } from './create-staff.command';

@CommandHandler(CreateStaffCommand)
export class CreateStaffCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  StaffEntity
> {
  constructor(
    unitOfWork: StaffUnitOfWork,
    private readonly mailService: MailService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: CreateStaffCommand,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    const { payload, trxId } = command;

    const repository = this.unitOfWork.getStaffRepository(trxId);

    const email = new EmailVO(payload.email);

    const existedEmailResult = await repository.getOneByEmail(email);
    if (!existedEmailResult.isErr) {
      return Result.fail(
        new ConflictException('Почтовый адрес уже используется в системе'),
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

    const password = generatePassword();

    const newStaff = StaffEntity.create({
      email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      phone: new PhoneVO(payload.phone),
      role: payload.role,
      birthdate: payload.birthdate ? new DateVO(payload.birthdate) : undefined,
      password: new HashPasswordVO(password),
      isRemoved: false,
    });

    const createdStaffResult = await repository.create(newStaff);
    createdStaffResult.unwrap();

    const sendEmailResult = await this.mailService.sendPasswordToNewStaff(
      email,
      newStaff.name,
      password,
    );
    sendEmailResult.unwrap();

    return createdStaffResult;
  }
}
