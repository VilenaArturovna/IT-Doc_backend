import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { WorkEntity } from '@modules/order/domain';
import { WorkResponseDto } from '@modules/order/dtos';
import { Role } from '@modules/staff/types';
import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateWorkCommand } from './update-work.command';
import { UpdateWorkRequestDto } from './update-work.request.dto';

@ApiTags('order/work')
@Controller()
export class UpdateWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update work' })
  @ApiOkResponse({ type: () => WorkResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN]))
  @Patch(routes.work.byId)
  async updateWork(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkRequestDto,
  ): Promise<WorkResponseDto> {
    const command = new UpdateWorkCommand({ payload: { ...body, id } });

    const result: Result<WorkEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new WorkResponseDto(entity)).unwrap();
  }
}
