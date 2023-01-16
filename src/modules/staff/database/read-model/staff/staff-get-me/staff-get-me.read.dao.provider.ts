import { Provider } from '@nestjs/common';

import { StaffGetMeObjectionReadDao } from './staff-get-me.objection.read.dao';
import { StaffGetMeReadDao } from './staff-get-me.read.dao';

export const StaffGetMeReadDaoProvider: Provider<StaffGetMeReadDao> = {
  provide: StaffGetMeReadDao,
  useClass: StaffGetMeObjectionReadDao,
};
