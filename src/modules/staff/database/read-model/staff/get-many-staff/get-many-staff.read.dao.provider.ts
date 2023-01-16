import { Provider } from '@nestjs/common';

import { GetManyStaffObjectionReadDao } from './get-many-staff.objection.read.dao';
import { GetManyStaffReadDao } from './get-many-staff.read.dao';

export const GetManyStaffReadDaoProvider: Provider<GetManyStaffReadDao> = {
  provide: GetManyStaffReadDao,
  useClass: GetManyStaffObjectionReadDao,
};
