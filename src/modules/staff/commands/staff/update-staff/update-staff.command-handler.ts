import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { DateVO, PhoneVO, UrlVO, UuidVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { StaffEntity } from '@modules/staff/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateStaffCommand } from './update-staff.command';

@CommandHandler(UpdateStaffCommand)
export class UpdateStaffCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  StaffEntity
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateStaffCommand,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    const {
      payload: { id, ...payload },
      trxId,
    } = command;

    const repository = this.unitOfWork.getStaffRepository(trxId);

    const staffResult = await repository.getOneById(new UuidVO(id));
    const staff = staffResult.unwrap();

    staff.update({
      lastname: payload.lastname,
      firstname: payload.firstname,
      phone: new PhoneVO(payload.phone),
      avatar: payload.avatar ? new UrlVO(payload.avatar) : undefined,
      birthdate: payload.birthdate ? new DateVO(payload.birthdate) : undefined,
    });

    return repository.update(staff);
  }
}
