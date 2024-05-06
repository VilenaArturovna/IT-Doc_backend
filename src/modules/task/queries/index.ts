import {
  GetOneTaskController,
  GetOneTaskQueryHandler,
} from '@modules/task/queries/task';

export * from './task';

export const queryControllers = [GetOneTaskController];
export const queryHandlers = [GetOneTaskQueryHandler];
