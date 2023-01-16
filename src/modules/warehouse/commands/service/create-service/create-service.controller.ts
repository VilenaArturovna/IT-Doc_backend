import { Body, Controller, Post } from '@nestjs/common';
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
import { CreateServiceCommand } from './create-service.command';
import { CreateServiceRequestDto } from './create-service.request.dto';
import { ServiceResponseDto } from '@modules/warehouse/dtos';
import { ServiceEntity } from '@modules/warehouse/domain';

@ApiTags('warehouse/service')
@Controller()
export class CreateServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service' })
  @ApiOkResponse({ type: () => ServiceResponseDto })
  @Post(routes.service.root)
  async createService(
    @Body() body: CreateServiceRequestDto,
  ): Promise<ServiceResponseDto> {
    const command = new CreateServiceCommand({ payload: body });

    const result: Result<ServiceEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new ServiceResponseDto(entity)).unwrap();
  }
}
