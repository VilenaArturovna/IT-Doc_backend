import {
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
} from '@modules/staff/database/read-model';

export const readDaoProviders = [
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
];
