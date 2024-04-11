import { ExceptionBase } from '@libs/base-classes';
import { RoleGuard } from '@libs/guards';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Role } from '@modules/staff/types';
import { VendorEntity } from '@modules/warehouse/domain';
import { VendorResponseDto } from '@modules/warehouse/dtos';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateVendorCommand } from './create-vendor.command';
import { CreateVendorRequestDto } from './create-vendor.request.dto';

@ApiTags('warehouse/vendor')
@Controller()
export class CreateVendorController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create vendor' })
  @ApiOkResponse({ type: () => VendorResponseDto })
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER, Role.ENGINEER]))
  @Post(routes.vendor.root)
  async createVendor(
    @Body() body: CreateVendorRequestDto,
  ): Promise<VendorResponseDto> {
    const command = new CreateVendorCommand({ payload: body });

    const result: Result<VendorEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new VendorResponseDto(entity)).unwrap();
  }
}
