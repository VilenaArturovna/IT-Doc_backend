import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { UuidVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';

import { RemoveStaffCommand } from './remove-staff.command';

@CommandHandler(RemoveStaffCommand)
export class RemoveStaffCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  void
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: RemoveStaffCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getStaffRepository(command.trxId);

    const staffResult = await repository.getOneById(
      new UuidVO(command.payload.id),
    );
    const staff = staffResult.unwrap();

    staff.remove();

    const updateResult = await repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
