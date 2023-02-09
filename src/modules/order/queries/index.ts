import {
  GetManyWorksController,
  GetManyWorksQueryHandler,
  GetOneWorkController,
  GetOneWorkQueryHandler,
} from '@modules/order/queries/work';

export * from './work';

export const queryControllers = [GetManyWorksController, GetOneWorkController];
export const queryHandlers = [GetManyWorksQueryHandler, GetOneWorkQueryHandler];
