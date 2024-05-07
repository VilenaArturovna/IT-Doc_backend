import {
  CreateTaskCommandHandler,
  CreateTaskController,
  RemoveTaskCommandHandler,
  RemoveTaskController,
  TakeTaskToWorkCommandHandler,
  TakeTaskToWorkController,
} from '@modules/task/commands/task';

export const commandControllers = [
  CreateTaskController,
  RemoveTaskController,
  TakeTaskToWorkController,
];
export const commandHandlers = [
  CreateTaskCommandHandler,
  RemoveTaskCommandHandler,
  TakeTaskToWorkCommandHandler,
];
