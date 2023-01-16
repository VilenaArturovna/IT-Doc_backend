import { CommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from './change-password.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: ChangePasswordCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const { id, oldPassword, newPassword } = command.payload;

    const staffResult = await this.repository.getOneById(new UuidVO(id));
    const staff = staffResult.unwrap();

    staff.changePassword(oldPassword, newPassword);

    const updateResult = await this.repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
