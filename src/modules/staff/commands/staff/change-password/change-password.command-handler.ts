import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';

import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  void
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: ChangePasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const { id, oldPassword, newPassword } = command.payload;

    const repository = this.unitOfWork.getStaffRepository(command.trxId);

    const staffResult = await repository.getOneById(new UuidVO(id));
    const staff = staffResult.unwrap();

    staff.changePassword(oldPassword, newPassword);

    const updateResult = await repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
