import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyId } from '@src/common';

import { ChangePasswordCommand } from './change-password.command';
import { ChangePasswordRequestDto } from './change-password.request.dto';

@ApiTags('staff')
@Controller()
export class ChangePasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @HttpCode(204)
  @Patch(routes.staff.changePassword)
  async changePassword(
    @MyId() id: string,
    @Body() body: ChangePasswordRequestDto,
  ): Promise<void> {
    const command = new ChangePasswordCommand({ payload: { ...body, id } });

    const result: Result<void, ExceptionBase> = await this.commandBus.execute(
      command,
    );

    result.unwrap();
  }
}
