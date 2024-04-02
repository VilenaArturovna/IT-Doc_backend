import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { NotFoundException, ValidationException } from '@libs/exceptions';
import { checkTelegramHash, Result } from '@libs/utils';
import { UrlVO } from '@libs/value-objects';
import { StaffUnitOfWork } from '@modules/staff/database/unit-of-work';
import { StaffEntity } from '@modules/staff/domain';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@src/common/guards/auth/strategies/jwt.payload';

import { LoginViaTgCommand } from './login-via-tg.command';

@CommandHandler(LoginViaTgCommand)
export class LoginViaTgCommandHandler extends CommandHandlerBase<
  StaffUnitOfWork,
  { staff: StaffEntity; token: string }
> {
  constructor(
    unitOfWork: StaffUnitOfWork,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: LoginViaTgCommand,
  ): Promise<Result<{ staff: StaffEntity; token: string }, ExceptionBase>> {
    const {
      payload: { id, photo_url, username },
      trxId,
    } = command;

    const telegramToken = this.configService.get<string>('telegram.token');

    const isValidHash = checkTelegramHash(command.payload, telegramToken);
    if (!isValidHash) {
      return Result.fail(
        new ValidationException('Данные приходят не от бота IT-Doc'),
      );
    }

    const repository = this.unitOfWork.getStaffRepository(trxId);
    const activeStaffResult = await repository.getOneByTgId(id.toString());

    if (!activeStaffResult.isErr) {
      const staff = activeStaffResult.unwrap();

      const jwtPayload: JwtPayload = {
        id: staff.id.value,
        role: staff.role,
      };
      const token = this.jwtService.sign(jwtPayload, { expiresIn: '365d' });

      return Result.ok({ staff, token });
    }

    const existedStaffResult = await repository.getOneByTgUsername(username);

    if (!existedStaffResult.isErr) {
      const staff = existedStaffResult.unwrap();

      staff.activate(
        id.toString(),
        photo_url ? new UrlVO(photo_url) : undefined,
      );

      const jwtPayload: JwtPayload = {
        id: staff.id.value,
        role: staff.role,
      };
      const token = this.jwtService.sign(jwtPayload, { expiresIn: '365d' });

      return Result.ok({ staff, token });
    }

    return Result.fail(new NotFoundException('Пользователь не найден'));
  }
}
