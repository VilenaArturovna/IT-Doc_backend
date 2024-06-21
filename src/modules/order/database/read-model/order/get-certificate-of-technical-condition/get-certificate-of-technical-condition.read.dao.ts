import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetCertificateOfTechnicalConditionQuery } from '@modules/order/queries';

export class GetCertificateOfTechnicalConditionDaoModel {
  client: string;
  equipment: string;
  serialNumberEquipment?: string;
  equipmentCondition: string;
  works: string[];
  staff: string;
  number: string;
}

export abstract class GetCertificateOfTechnicalConditionReadDao extends ReadDaoBase<
  GetCertificateOfTechnicalConditionDaoModel,
  GetCertificateOfTechnicalConditionQuery
> {
  abstract query(
    query: GetCertificateOfTechnicalConditionQuery,
  ): Promise<Result<GetCertificateOfTechnicalConditionDaoModel, ExceptionBase>>;
}
