import {
  GetManyWorksController,
  GetManyWorksQueryHandler,
  GetOneWorkController,
  GetOneWorkQueryHandler,
} from '@modules/order/queries/work';
import {
  GetManyClientsController,
  GetManyClientsQueryHandler,
  GetOneClientController,
  GetOneClientQueryHandler,
} from '@modules/order/queries/client';

export * from './client';
export * from './work';

export const queryControllers = [
  GetManyWorksController,
  GetOneWorkController,
  GetManyClientsController,
  GetOneClientController,
];
export const queryHandlers = [
  GetManyWorksQueryHandler,
  GetOneWorkQueryHandler,
  GetManyClientsQueryHandler,
  GetOneClientQueryHandler,
];
