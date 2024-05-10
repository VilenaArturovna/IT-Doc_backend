import {
  GetManyTasksController,
  GetManyTasksQueryHandler,
  GetOneTaskController,
  GetOneTaskQueryHandler,
} from '@modules/task/queries/task';

export * from './task';

export const queryControllers = [GetOneTaskController, GetManyTasksController];
export const queryHandlers = [GetOneTaskQueryHandler, GetManyTasksQueryHandler];
