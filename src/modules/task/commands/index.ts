import {
  AddCommentToTaskCommandHandler,
  AddCommentToTaskController,
  CompleteTaskCommandHandler,
  CompleteTaskController,
  CreateTaskCommandHandler,
  CreateTaskController,
  MarkTaskAsReadCommandHandler,
  MarkTaskAsReadController,
  RemoveTaskCommandHandler,
  RemoveTaskController,
  TakeTaskToWorkCommandHandler,
  TakeTaskToWorkController,
  UpdateTaskCommandHandler,
  UpdateTaskController,
} from '@modules/task/commands/task';

export const commandControllers = [
  CreateTaskController,
  RemoveTaskController,
  TakeTaskToWorkController,
  AddCommentToTaskController,
  CompleteTaskController,
  MarkTaskAsReadController,
  UpdateTaskController,
];
export const commandHandlers = [
  CreateTaskCommandHandler,
  RemoveTaskCommandHandler,
  TakeTaskToWorkCommandHandler,
  AddCommentToTaskCommandHandler,
  CompleteTaskCommandHandler,
  MarkTaskAsReadCommandHandler,
  UpdateTaskCommandHandler,
];
