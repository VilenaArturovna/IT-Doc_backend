import { CommandHandler } from '@nestjs/cqrs';
import { CreateStaffCommand } from './create-staff.command';
import { generatePassword, Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { StaffEntity } from '@modules/staff/domain';
import { DateVO, EmailVO, HashPasswordVO, PhoneVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';

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

    const existedEmailResult = await repository.getOneByEmail(
      new EmailVO(payload.email),
    );
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
      email: new EmailVO(payload.email),
      firstname: payload.firstname,
      lastname: payload.lastname,
      phone: new PhoneVO(payload.phone),
      role: payload.role,
      birthdate: payload.birthdate ? new DateVO(payload.birthdate) : undefined,
      password: new HashPasswordVO(password),
      isRemoved: false,
    });

    //todo: send email this password

    return repository.create(newStaff);
  }
}
