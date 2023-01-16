import { Provider } from '@nestjs/common';

import { GetOneServiceObjectionReadDao } from './get-one-service.objection.read.dao';
import { GetOneServiceReadDao } from './get-one-service.read.dao';

export const GetOneServiceReadDaoProvider: Provider<GetOneServiceReadDao> = {
  provide: GetOneServiceReadDao,
  useClass: GetOneServiceObjectionReadDao,
};
