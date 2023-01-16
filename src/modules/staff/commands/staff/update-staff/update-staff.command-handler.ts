import { CommandHandler } from '@nestjs/cqrs';
import { UpdateStaffCommand } from './update-staff.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { DateVO, PhoneVO, UrlVO, UuidVO } from '@libs/value-objects';
import { StaffEntity } from '@modules/staff/domain';

@CommandHandler(UpdateStaffCommand)
export class UpdateStaffCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: UpdateStaffCommand,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    const { id, ...payload } = command.payload;

    const staffResult = await this.repository.getOneById(new UuidVO(id));
    const staff = staffResult.unwrap();

    staff.update({
      lastname: payload.lastname,
      firstname: payload.firstname,
      phone: new PhoneVO(payload.phone),
      avatar: payload.avatar ? new UrlVO(payload.avatar) : undefined,
      birthdate: payload.birthdate ? new DateVO(payload.birthdate) : undefined,
    });

    return this.repository.update(staff);
  }
}
