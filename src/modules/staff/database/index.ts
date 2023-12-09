import {
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
  StaffSignInReadDaoProvider,
} from '@modules/staff/database/read-model';

export const readDaoProviders = [
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
  StaffSignInReadDaoProvider,
];
