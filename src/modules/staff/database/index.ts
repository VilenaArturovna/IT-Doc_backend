import { StaffObjectionRepository } from '@modules/staff/database/repositories';
import {
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
  StaffSignInReadDaoProvider,
} from '@modules/staff/database/read-model';

export const repositories = [StaffObjectionRepository];
export const readDaoProviders = [
  GetManyStaffReadDaoProvider,
  GetStaffReadDaoProvider,
  StaffGetMeReadDaoProvider,
  StaffSignInReadDaoProvider,
];
