import { Provider } from '@nestjs/common';

import { GetStaffObjectionReadDao } from './get-staff.objection.read.dao';
import { GetStaffReadDao } from './get-staff.read.dao';

export const GetStaffReadDaoProvider: Provider<GetStaffReadDao> = {
  provide: GetStaffReadDao,
  useClass: GetStaffObjectionReadDao,
};
