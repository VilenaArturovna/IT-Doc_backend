import { ExceptionBase } from '@libs/base-classes';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import { GetCertificateOfTechnicalConditionQuery } from '@modules/order/queries';
import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('order/order')
@Controller()
export class GetCertificateOfTechnicalConditionController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get certificate of technical condition' })
  @Get(routes.order.certificateOfTechnicalCondition)
  async getCertificateOfTechnicalCondition(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ): Promise<void> {
    const query = new GetCertificateOfTechnicalConditionQuery({
      params: { id },
    });

    const result: Result<Buffer, ExceptionBase> = await this.queryBus.execute(
      query,
    );

    const buffer: Buffer = result.unwrap();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }
}
