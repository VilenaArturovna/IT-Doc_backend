import { Provider } from '@nestjs/common';

import { GetAllDeadlinesObjectionReadDao } from './get-all-deadlines.objection.read.dao';
import { GetAllDeadlinesReadDao } from './get-all-deadlines.read.dao';

export const GetAllDeadlinesReadDaoProvider: Provider<GetAllDeadlinesReadDao> =
  {
    provide: GetAllDeadlinesReadDao,
    useClass: GetAllDeadlinesObjectionReadDao,
  };
