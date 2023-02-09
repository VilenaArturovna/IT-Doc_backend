import { Provider } from '@nestjs/common';

import { GetOneWorkObjectionReadDao } from './get-one-work.objection.read.dao';
import { GetOneWorkReadDao } from './get-one-work.read.dao';

export const GetOneWorkReadDaoProvider: Provider<GetOneWorkReadDao> = {
  provide: GetOneWorkReadDao,
  useClass: GetOneWorkObjectionReadDao,
};
