import { CommandHandler } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from './forgot-password.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { HashVO } from '@libs/value-objects';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: ForgotPasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const { resetPasswordHash, password } = command.payload;

    const staffResult = await this.repository.getOneByResetPasswordHash(
      new HashVO(resetPasswordHash),
    );
    const staff = staffResult.unwrap();

    staff.forgotPassword(password);

    const updateResult = await this.repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
