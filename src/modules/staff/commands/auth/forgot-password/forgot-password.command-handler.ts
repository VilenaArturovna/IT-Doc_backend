import { CommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from './forgot-password.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { HashVO } from '@libs/value-objects';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  void
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: ForgotPasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const { resetPasswordHash, password } = command.payload;

    const repository = this.unitOfWork.getStaffRepository(command.trxId);

    const staffResult = await repository.getOneByResetPasswordHash(
      new HashVO(resetPasswordHash),
    );
    const staff = staffResult.unwrap();

    staff.forgotPassword(password);

    const updateResult = await repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
