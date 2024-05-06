import {
  CreateTaskCommandHandler,
  CreateTaskController,
} from '@modules/task/commands/task';

export const commandControllers = [CreateTaskController];
export const commandHandlers = [CreateTaskCommandHandler];
