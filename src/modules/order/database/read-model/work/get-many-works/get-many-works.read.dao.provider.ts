import { Provider } from '@nestjs/common';

import { GetManyWorksObjectionReadDao } from './get-many-works.objection.read.dao';
import { GetManyWorksReadDao } from './get-many-works.read.dao';

export const GetManyWorksReadDaoProvider: Provider<GetManyWorksReadDao> = {
  provide: GetManyWorksReadDao,
  useClass: GetManyWorksObjectionReadDao,
};
