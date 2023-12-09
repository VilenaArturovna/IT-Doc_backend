import { CommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from './reset-password.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { EmailVO, HashVO } from '@libs/value-objects';
import { NotFoundException } from '@libs/exceptions';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  void
> {
  constructor(unitOfWork: StaffUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: ResetPasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getStaffRepository(command.trxId);

    const staffResult = await repository.getOneByEmail(
      new EmailVO(command.payload.email),
    );

    if (staffResult.isErr) {
      return Result.fail(new NotFoundException('Пользователь не найден'));
    }

    const staff = staffResult.unwrap();

    staff.resetPasswordHash = await HashVO.generateHash(staff.id.value);

    const updateResult = await repository.update(staff);
    updateResult.unwrap();

    //todo: send email

    return Result.ok();
  }
}
