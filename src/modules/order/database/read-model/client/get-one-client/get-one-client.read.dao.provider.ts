import { Provider } from '@nestjs/common';

import { GetOneClientObjectionReadDao } from './get-one-client.objection.read.dao';
import { GetOneClientReadDao } from './get-one-client.read.dao';

export const GetOneClientReadDaoProvider: Provider<GetOneClientReadDao> = {
  provide: GetOneClientReadDao,
  useClass: GetOneClientObjectionReadDao,
};
