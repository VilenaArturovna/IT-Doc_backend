import { Provider } from '@nestjs/common';

import { GetManyProvidersObjectionReadDao } from './get-many-providers.objection.read.dao';
import { GetManyProvidersReadDao } from './get-many-providers.read.dao';

export const GetManyProvidersReadDaoProvider: Provider<GetManyProvidersReadDao> =
  {
    provide: GetManyProvidersReadDao,
    useClass: GetManyProvidersObjectionReadDao,
  };
