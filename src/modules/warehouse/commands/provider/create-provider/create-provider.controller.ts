import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { ProviderEntity } from '@modules/warehouse/domain';
import { ProviderResponseDto } from '@modules/warehouse/dtos';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProviderCommand } from './create-provider.command';
import { CreateProviderRequestDto } from './create-provider.request.dto';

@ApiTags('warehouse/provider')
@Controller()
export class CreateProviderController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create provider' })
  @ApiOkResponse({ type: () => ProviderResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Post(routes.provider.root)
  async createProvider(
    @Body() body: CreateProviderRequestDto,
  ): Promise<ProviderResponseDto> {
    const command = new CreateProviderCommand({ payload: body });

    const result: Result<ProviderEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result
      .mapValue((entity) => new ProviderResponseDto(entity))
      .unwrap();
  }
}
