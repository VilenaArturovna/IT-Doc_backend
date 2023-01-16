import { Provider } from '@nestjs/common';

import { GetOneVendorObjectionReadDao } from './get-one-vendor.objection.read.dao';
import { GetOneVendorReadDao } from './get-one-vendor.read.dao';

export const GetOneVendorReadDaoProvider: Provider<GetOneVendorReadDao> = {
  provide: GetOneVendorReadDao,
  useClass: GetOneVendorObjectionReadDao,
};
