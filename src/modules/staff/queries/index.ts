import {
  GetManyStaffController,
  GetManyStaffQueryHandler,
  GetStaffController,
  GetStaffQueryHandler,
  StaffGetMeController,
  StaffGetMeQueryHandler,
} from '@modules/staff/queries/staff';
import {
  StaffSignInController,
  StaffSignInQueryHandler,
} from '@modules/staff/queries/auth';

export * from './auth';
export * from './staff';

export const queryControllers = [
  GetManyStaffController,
  GetStaffController,
  StaffGetMeController,
  StaffSignInController,
];

export const queryHandlers = [
  GetManyStaffQueryHandler,
  GetStaffQueryHandler,
  StaffGetMeQueryHandler,
  StaffSignInQueryHandler,
];
