import { CommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from './reset-password.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { EmailVO, HashVO } from '@libs/value-objects';
import { NotFoundException } from '@libs/exceptions';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: ResetPasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const staffResult = await this.repository.getOneByEmail(
      new EmailVO(command.payload.email),
    );

    if (staffResult.isErr) {
      return Result.fail(new NotFoundException('Пользователь не найден'));
    }

    const staff = staffResult.unwrap();

    staff.resetPasswordHash = await HashVO.generateHash(staff.id.value);

    const updateResult = await this.repository.update(staff);
    updateResult.unwrap();

    //todo: send email

    return Result.ok();
  }
}
