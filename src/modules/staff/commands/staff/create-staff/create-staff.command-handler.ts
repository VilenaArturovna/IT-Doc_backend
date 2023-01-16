import { CommandHandler } from '@nestjs/cqrs';
import { CreateStaffCommand } from './create-staff.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { generatePassword, Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { StaffEntity } from '@modules/staff/domain';
import { DateVO, EmailVO, HashPasswordVO, PhoneVO } from '@libs/value-objects';
import { ConflictException } from '@libs/exceptions';

@CommandHandler(CreateStaffCommand)
export class CreateStaffCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: CreateStaffCommand,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    const payload = command.payload;

    const existedEmailResult = await this.repository.getOneByEmail(
      new EmailVO(payload.email),
    );
    if (!existedEmailResult.isErr) {
      return Result.fail(
        new ConflictException('Почтовый адрес уже используется в системе'),
      );
    }

    const existedPhoneResult = await this.repository.getOneByPhone(
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

    return this.repository.create(newStaff);
  }
}
