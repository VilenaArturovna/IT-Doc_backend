import {
  LoginViaTgCommandHandler,
  LoginViaTgController,
} from '@modules/staff/commands/auth';
import {
  CreateStaffCommandHandler,
  CreateStaffController,
  RemoveStaffCommandHandler,
  RemoveStaffController,
  UpdateStaffCommandHandler,
  UpdateStaffController,
} from '@modules/staff/commands/staff';

export * from './auth';
export * from './staff';

export const commandControllers = [
  LoginViaTgController,
  CreateStaffController,
  RemoveStaffController,
  UpdateStaffController,
];

export const commandHandlers = [
  LoginViaTgCommandHandler,
  CreateStaffCommandHandler,
  RemoveStaffCommandHandler,
  UpdateStaffCommandHandler,
];
