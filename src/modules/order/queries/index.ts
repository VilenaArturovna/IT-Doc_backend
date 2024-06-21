import {
  GetManyClientsController,
  GetManyClientsQueryHandler,
  GetOneClientController,
  GetOneClientQueryHandler,
} from '@modules/order/queries/client';
import {
  GetAllDeadlinesController,
  GetAllDeadlinesQueryHandler,
} from '@modules/order/queries/deadline';
import {
  GetCertificateOfTechnicalConditionController,
  GetCertificateOfTechnicalConditionQueryHandler,
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
export * from './deadline';
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
  GetAllDeadlinesController,
  GetCertificateOfTechnicalConditionController,
];
export const queryHandlers = [
  GetManyWorksQueryHandler,
  GetOneWorkQueryHandler,
  GetManyClientsQueryHandler,
  GetOneClientQueryHandler,
  GetOneOrderQueryHandler,
  GetInfoAboutOrderForClientQueryHandler,
  GetManyOrdersQueryHandler,
  GetAllDeadlinesQueryHandler,
  GetCertificateOfTechnicalConditionQueryHandler,
];
