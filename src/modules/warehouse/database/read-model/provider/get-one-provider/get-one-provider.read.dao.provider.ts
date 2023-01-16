import { Provider } from '@nestjs/common';

import { GetOneProviderObjectionReadDao } from './get-one-provider.objection.read.dao';
import { GetOneProviderReadDao } from './get-one-provider.read.dao';

export const GetOneProviderReadDaoProvider: Provider<GetOneProviderReadDao> = {
  provide: GetOneProviderReadDao,
  useClass: GetOneProviderObjectionReadDao,
};
