import {
  ChangePasswordCommandHandler,
  ChangePasswordController,
  CreateStaffCommandHandler,
  CreateStaffController,
  RemoveStaffCommandHandler,
  RemoveStaffController,
  UpdateStaffCommandHandler,
  UpdateStaffController,
} from '@modules/staff/commands/staff';
import {
  ForgotPasswordCommandHandler,
  ForgotPasswordController,
  ResetPasswordCommandHandler,
  ResetPasswordController,
} from '@modules/staff/commands/auth';

export * from './auth';
export * from './staff';

export const commandControllers = [
  ChangePasswordController,
  CreateStaffController,
  RemoveStaffController,
  UpdateStaffController,
  ForgotPasswordController,
  ResetPasswordController,
];

export const commandHandlers = [
  ChangePasswordCommandHandler,
  CreateStaffCommandHandler,
  RemoveStaffCommandHandler,
  UpdateStaffCommandHandler,
  ForgotPasswordCommandHandler,
  ResetPasswordCommandHandler,
];
