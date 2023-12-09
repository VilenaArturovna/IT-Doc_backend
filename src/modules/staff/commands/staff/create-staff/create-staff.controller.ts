import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { StaffEntity } from '@modules/staff/domain';
import { StaffResponseDto } from '@modules/staff/dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStaffCommand } from './create-staff.command';
import { CreateStaffRequestDto } from './create-staff.request.dto';

@ApiTags('staff')
@Controller()
export class CreateStaffController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create staff' })
  @ApiOkResponse({ type: () => StaffResponseDto })
  @Post(routes.staff.root)
  async createUser(
    @Body() body: CreateStaffRequestDto,
  ): Promise<StaffResponseDto> {
    const command = new CreateStaffCommand({ payload: body });

    const result: Result<StaffEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new StaffResponseDto(entity)).unwrap();
  }
}
