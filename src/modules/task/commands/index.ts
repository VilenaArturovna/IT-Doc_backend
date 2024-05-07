import {
  AddCommentToTaskCommandHandler,
  AddCommentToTaskController,
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
  AddCommentToTaskController,
];
export const commandHandlers = [
  CreateTaskCommandHandler,
  RemoveTaskCommandHandler,
  TakeTaskToWorkCommandHandler,
  AddCommentToTaskCommandHandler,
];
