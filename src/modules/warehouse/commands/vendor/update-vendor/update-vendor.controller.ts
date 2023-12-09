import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { VendorEntity } from '@modules/warehouse/domain';
import { VendorResponseDto } from '@modules/warehouse/dtos';
import { Body, Controller, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateVendorCommand } from './update-vendor.command';
import { UpdateVendorRequestDto } from './update-vendor.request.dto';

@ApiTags('warehouse/vendor')
@Controller()
export class UpdateVendorController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update vendor' })
  @ApiOkResponse({ type: () => VendorResponseDto })
  @Patch(routes.vendor.byId)
  async updateVendor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateVendorRequestDto,
  ): Promise<VendorResponseDto> {
    const command = new UpdateVendorCommand({ payload: { ...body, id } });

    const result: Result<VendorEntity, ExceptionBase> =
      await this.commandBus.execute(command);

    return result.mapValue((entity) => new VendorResponseDto(entity)).unwrap();
  }
}
