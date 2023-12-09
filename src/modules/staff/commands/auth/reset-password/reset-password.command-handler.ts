import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { NotFoundException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import { EmailVO, HashVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';
import { MailService } from '@src/common';

import { ResetPasswordCommand } from './reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  void
> {
  constructor(
    unitOfWork: StaffUnitOfWork,
    private readonly mailService: MailService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: ResetPasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const repository = this.unitOfWork.getStaffRepository(command.trxId);

    const email = new EmailVO(command.payload.email);

    const staffResult = await repository.getOneByEmail(email);

    if (staffResult.isErr) {
      return Result.fail(new NotFoundException('Пользователь не найден'));
    }

    const staff = staffResult.unwrap();

    const resetPasswordHash = await HashVO.generateHash(staff.id.value);
    staff.resetPasswordHash = resetPasswordHash;

    const updateResult = await repository.update(staff);
    updateResult.unwrap();

    const sendEmailResult = await this.mailService.passwordRecovery(
      resetPasswordHash,
      staff.name,
      email,
    );
    sendEmailResult.unwrap();

    return Result.ok();
  }
}
