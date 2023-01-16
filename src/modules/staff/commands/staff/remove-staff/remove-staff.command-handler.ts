import { CommandHandler } from '@nestjs/cqrs';
import { RemoveStaffCommand } from './remove-staff.command';
import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { UuidVO } from '@libs/value-objects';

@CommandHandler(RemoveStaffCommand)
export class RemoveStaffCommandHandler {
  constructor(private readonly repository: StaffObjectionRepository) {}

  async execute(
    command: RemoveStaffCommand,
  ): Promise<Result<void, ExceptionBase>> {
    const staffResult = await this.repository.getOneById(
      new UuidVO(command.payload.id),
    );
    const staff = staffResult.unwrap();

    staff.remove();

    const updateResult = await this.repository.update(staff);
    updateResult.unwrap();

    return Result.ok();
  }
}
