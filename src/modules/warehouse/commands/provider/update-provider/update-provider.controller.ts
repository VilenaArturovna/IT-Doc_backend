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
import { UpdateProviderCommand } from './update-provider.command';
import { UpdateProviderRequestDto } from './update-provider.request.dto';
import { ProviderResponseDto } from '@modules/warehouse/dtos';
import { ProviderEntity } from '@modules/warehouse/domain';

@ApiTags('warehouse/provider')
@Controller()
export class UpdateProviderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update provider' })
  @ApiOkResponse({ type: () => ProviderResponseDto })
  @Patch(routes.provider.byId)
  async updateProvider(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateProviderRequestDto,
  ): Promise<ProviderResponseDto> {
    const command = new UpdateProviderCommand({ payload: { ...body, id } });

    const result: Result<ProviderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new ProviderResponseDto(entity))
      .unwrap();
  }
}
