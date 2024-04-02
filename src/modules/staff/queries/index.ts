import {
  GetManyStaffController,
  GetManyStaffQueryHandler,
  GetStaffController,
  GetStaffQueryHandler,
  StaffGetMeController,
  StaffGetMeQueryHandler,
} from '@modules/staff/queries/staff';

export * from './staff';

export const queryControllers = [
  GetManyStaffController,
  GetStaffController,
  StaffGetMeController,
];

export const queryHandlers = [
  GetManyStaffQueryHandler,
  GetStaffQueryHandler,
  StaffGetMeQueryHandler,
];
