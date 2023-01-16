import { Provider } from '@nestjs/common';

import { StaffSignInObjectionReadDao } from './staff-sign-in.objection.read.dao';
import { StaffSignInReadDao } from './staff-sign-in.read.dao';

export const StaffSignInReadDaoProvider: Provider<StaffSignInReadDao> = {
  provide: StaffSignInReadDao,
  useClass: StaffSignInObjectionReadDao,
};
