import {
  GetManyClientsController,
  GetManyClientsQueryHandler,
  GetOneClientController,
  GetOneClientQueryHandler,
} from '@modules/order/queries/client';
import {
  GetInfoAboutOrderForClientController,
  GetInfoAboutOrderForClientQueryHandler,
  GetManyOrdersController,
  GetManyOrdersQueryHandler,
  GetOneOrderController,
  GetOneOrderQueryHandler,
} from '@modules/order/queries/order';
import {
  GetManyWorksController,
  GetManyWorksQueryHandler,
  GetOneWorkController,
  GetOneWorkQueryHandler,
} from '@modules/order/queries/work';

export * from './client';
export * from './order';
export * from './work';

export const queryControllers = [
  GetManyWorksController,
  GetOneWorkController,
  GetManyClientsController,
  GetOneClientController,
  GetOneOrderController,
  GetInfoAboutOrderForClientController,
  GetManyOrdersController,
];
export const queryHandlers = [
  GetManyWorksQueryHandler,
  GetOneWorkQueryHandler,
  GetManyClientsQueryHandler,
  GetOneClientQueryHandler,
  GetOneOrderQueryHandler,
  GetInfoAboutOrderForClientQueryHandler,
  GetManyOrdersQueryHandler,
];
