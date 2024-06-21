import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetCertificateOfTechnicalConditionReadDao } from '@modules/order/database/read-model';
import { QueryHandler } from '@nestjs/cqrs';
import { HtmlPdfService } from '@src/common/services/html-pdf-service/html-to-pdf.adapter';

import { GetCertificateOfTechnicalConditionQuery } from './get-certificate-of-technical-condition.query';

@QueryHandler(GetCertificateOfTechnicalConditionQuery)
export class GetCertificateOfTechnicalConditionQueryHandler {
  constructor(
    private readonly readDao: GetCertificateOfTechnicalConditionReadDao,
  ) {}

  async execute(
    query: GetCertificateOfTechnicalConditionQuery,
  ): Promise<Result<Buffer, ExceptionBase>> {
    const dataResult = await this.readDao.query(query);

    const buffer = await new HtmlPdfService().createPdfBuffer(
      'technical-condition',
      dataResult.unwrap(),
    );

    return Result.ok(buffer);
  }
}
