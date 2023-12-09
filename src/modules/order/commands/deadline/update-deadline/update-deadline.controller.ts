import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { DeadlineEntity } from '@modules/order/domain';
import { DeadlineResponseDto } from '@modules/order/dtos';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateDeadlineCommand } from './update-deadline.command';
import { UpdateDeadlineRequestDto } from './update-deadline.request.dto';

@ApiTags('order/deadline')
@Controller()
export class UpdateDeadlineController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update deadline' })
  @ApiOkResponse({ type: () => DeadlineResponseDto })
  @Patch(routes.deadline.byId)
  async updateDeadline(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateDeadlineRequestDto,
  ): Promise<DeadlineResponseDto> {
    const command = new UpdateDeadlineCommand({ payload: { ...body, id } });

    const result: Result<DeadlineEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new DeadlineResponseDto(entity))
      .unwrap();
  }
}
