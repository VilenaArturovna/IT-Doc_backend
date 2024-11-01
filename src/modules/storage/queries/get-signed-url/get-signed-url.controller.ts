import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetSignedUrlQuery } from './get-signed-url.query';
import { GetSignedUrlRequestDto } from './get-signed-url.request.dto';

@ApiTags('storage/storage')
@Controller()
export class GetSignedUrlController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get signed url' })
  @ApiExtraModels(GetSignedUrlRequestDto)
  @Get(routes.storage.getSignedUrl)
  async getSignedUrl(
    @Query() urlQuery: GetSignedUrlRequestDto,
  ): Promise<string> {
    const query = new GetSignedUrlQuery({ params: urlQuery });

    const result: Result<string, ExceptionBase> = await this.queryBus.execute(
      query,
    );

    return result.unwrap();
  }
}
