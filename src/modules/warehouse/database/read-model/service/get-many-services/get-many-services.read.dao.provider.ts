import { Provider } from '@nestjs/common';

import { GetManyServicesObjectionReadDao } from './get-many-services.objection.read.dao';
import { GetManyServicesReadDao } from './get-many-services.read.dao';

export const GetManyServicesReadDaoProvider: Provider<GetManyServicesReadDao> =
  {
    provide: GetManyServicesReadDao,
    useClass: GetManyServicesObjectionReadDao,
  };
