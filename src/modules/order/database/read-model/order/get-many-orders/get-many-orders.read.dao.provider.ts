import { Provider } from '@nestjs/common';

import { GetManyOrdersObjectionReadDao } from './get-many-orders.objection.read.dao';
import { GetManyOrdersReadDao } from './get-many-orders.read.dao';

export const GetManyOrdersReadDaoProvider: Provider<GetManyOrdersReadDao> = {
  provide: GetManyOrdersReadDao,
  useClass: GetManyOrdersObjectionReadDao,
};
