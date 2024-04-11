import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { WorkEntity } from '@modules/order/domain';
import { WorkResponseDto } from '@modules/order/dtos';
import { Role } from '@modules/staff/types';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateWorkCommand } from './create-work.command';
import { CreateWorkRequestDto } from './create-work.request.dto';

@ApiTags('order/work')
@Controller()
export class CreateWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create work' })
  @ApiOkResponse({ type: () => WorkResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN]))
  @Post(routes.work.root)
  async createWork(
    @Body() body: CreateWorkRequestDto,
  ): Promise<WorkResponseDto> {
    const command = new CreateWorkCommand({ payload: body });

    const result: Result<WorkEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new WorkResponseDto(entity)).unwrap();
  }
}
