import {
  CreateTaskCommandHandler,
  CreateTaskController,
  RemoveTaskCommandHandler,
  RemoveTaskController,
} from '@modules/task/commands/task';

export const commandControllers = [CreateTaskController, RemoveTaskController];
export const commandHandlers = [
  CreateTaskCommandHandler,
  RemoveTaskCommandHandler,
];
