import { Provider } from '@nestjs/common';

import { GetManyClientsObjectionReadDao } from './get-many-clients.objection.read.dao';
import { GetManyClientsReadDao } from './get-many-clients.read.dao';

export const GetManyClientsReadDaoProvider: Provider<GetManyClientsReadDao> = {
  provide: GetManyClientsReadDao,
  useClass: GetManyClientsObjectionReadDao,
};
