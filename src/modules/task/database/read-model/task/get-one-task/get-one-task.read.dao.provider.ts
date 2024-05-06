import { Provider } from '@nestjs/common';

import { GetOneTaskObjectionReadDao } from './get-one-task.objection.read.dao';
import { GetOneTaskReadDao } from './get-one-task.read.dao';

export const GetOneTaskReadDaoProvider: Provider<GetOneTaskReadDao> = {
  provide: GetOneTaskReadDao,
  useClass: GetOneTaskObjectionReadDao,
};
