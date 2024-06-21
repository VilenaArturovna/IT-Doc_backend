import { GetCertificateOfTechnicalConditionDaoModel } from '@modules/order/database/read-model';

export type HtmlToPdfType = 'technical-condition' | 'acceptance';

export interface HtmlToPdfPort {
  createPdfBuffer(
    type: HtmlToPdfType,
    data: GetCertificateOfTechnicalConditionDaoModel,
  ): Promise<Buffer>;
}
