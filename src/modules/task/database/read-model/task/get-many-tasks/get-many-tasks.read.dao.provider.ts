import { Provider } from '@nestjs/common';

import { GetManyTasksObjectionReadDao } from './get-many-tasks.objection.read.dao';
import { GetManyTasksReadDao } from './get-many-tasks.read.dao';

export const GetManyTasksReadDaoProvider: Provider<GetManyTasksReadDao> = {
  provide: GetManyTasksReadDao,
  useClass: GetManyTasksObjectionReadDao,
};
