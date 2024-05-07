import {
  AddCommentToTaskCommandHandler,
  AddCommentToTaskController,
  CompleteTaskCommandHandler,
  CompleteTaskController,
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
  CompleteTaskController,
];
export const commandHandlers = [
  CreateTaskCommandHandler,
  RemoveTaskCommandHandler,
  TakeTaskToWorkCommandHandler,
  AddCommentToTaskCommandHandler,
  CompleteTaskCommandHandler,
];
