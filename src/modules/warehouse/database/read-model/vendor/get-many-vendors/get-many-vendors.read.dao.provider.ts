import { Provider } from '@nestjs/common';

import { GetManyVendorsObjectionReadDao } from './get-many-vendors.objection.read.dao';
import { GetManyVendorsReadDao } from './get-many-vendors.read.dao';

export const GetManyVendorsReadDaoProvider: Provider<GetManyVendorsReadDao> = {
  provide: GetManyVendorsReadDao,
  useClass: GetManyVendorsObjectionReadDao,
};
