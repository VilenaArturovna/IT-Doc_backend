import { Provider } from '@nestjs/common';

import { GetCertificateOfTechnicalConditionObjectionReadDao } from './get-certificate-of-technical-condition.objection.read.dao';
import { GetCertificateOfTechnicalConditionReadDao } from './get-certificate-of-technical-condition.read.dao';

export const GetCertificateOfTechnicalConditionReadDaoProvider: Provider<GetCertificateOfTechnicalConditionReadDao> =
  {
    provide: GetCertificateOfTechnicalConditionReadDao,
    useClass: GetCertificateOfTechnicalConditionObjectionReadDao,
  };
