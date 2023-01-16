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
import { UpdateServiceCommand } from './update-service.command';
import { UpdateServiceRequestDto } from './update-service.request.dto';
import { ServiceResponseDto } from '@modules/warehouse/dtos';
import { ServiceEntity } from '@modules/warehouse/domain';

@ApiTags('warehouse/service')
@Controller()
export class UpdateServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update service' })
  @ApiOkResponse({ type: () => ServiceResponseDto })
  @Patch(routes.service.byId)
  async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateServiceRequestDto,
  ): Promise<ServiceResponseDto> {
    const command = new UpdateServiceCommand({ payload: { ...body, id } });

    const result: Result<ServiceEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new ServiceResponseDto(entity)).unwrap();
  }
}
