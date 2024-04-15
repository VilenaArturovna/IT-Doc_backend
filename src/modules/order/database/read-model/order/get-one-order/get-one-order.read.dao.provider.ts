import { Provider } from '@nestjs/common';

import { GetOneOrderObjectionReadDao } from './get-one-order.objection.read.dao';
import { GetOneOrderReadDao } from './get-one-order.read.dao';

export const GetOneOrderReadDaoProvider: Provider<GetOneOrderReadDao> = {
  provide: GetOneOrderReadDao,
  useClass: GetOneOrderObjectionReadDao,
};
