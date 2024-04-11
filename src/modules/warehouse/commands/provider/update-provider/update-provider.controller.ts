import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { ProviderEntity } from '@modules/warehouse/domain';
import { ProviderResponseDto } from '@modules/warehouse/dtos';
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

import { UpdateProviderCommand } from './update-provider.command';
import { UpdateProviderRequestDto } from './update-provider.request.dto';

@ApiTags('warehouse/provider')
@Controller()
export class UpdateProviderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update provider' })
  @ApiOkResponse({ type: () => ProviderResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
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
