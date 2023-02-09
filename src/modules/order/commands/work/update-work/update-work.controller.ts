import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
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
import { UpdateWorkCommand } from './update-work.command';
import { UpdateWorkRequestDto } from './update-work.request.dto';
import { WorkResponseDto } from '@modules/order/dtos';
import { WorkEntity } from '@modules/order/domain';

@ApiTags('order/work')
@Controller()
export class UpdateWorkController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update work' })
  @ApiOkResponse({ type: () => WorkResponseDto })
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
