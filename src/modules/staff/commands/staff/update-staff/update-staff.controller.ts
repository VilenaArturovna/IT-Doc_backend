import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateStaffCommand } from './update-staff.command';
import { UpdateStaffRequestDto } from './update-staff.request.dto';
import { MyId } from '@src/common';
import { StaffResponseDto } from '@modules/staff/dtos';
import { StaffEntity } from '@modules/staff/domain';

@ApiTags('staff')
@Controller()
export class UpdateStaffController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update staff' })
  @ApiOkResponse({ type: () => StaffResponseDto })
  @Patch(routes.staff.root)
  async updateUser(
    @MyId() id: string,
    @Body() body: UpdateStaffRequestDto,
  ): Promise<StaffResponseDto> {
    const command = new UpdateStaffCommand({ payload: { ...body, id } });

    const result: Result<StaffEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new StaffResponseDto(entity)).unwrap();
  }
}
