import {
  GetAllDeadlinesReadDaoProvider,
  GetInfoAboutOrderForClientReadDaoProvider,
  GetManyClientsReadDaoProvider,
  GetManyOrdersReadDaoProvider,
  GetManyWorksReadDaoProvider,
  GetOneClientReadDaoProvider,
  GetOneOrderReadDaoProvider,
  GetOneWorkReadDaoProvider,
} from '@modules/order/database/read-model';

export const readDaoProviders = [
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
  GetManyClientsReadDaoProvider,
  GetOneClientReadDaoProvider,
  GetOneOrderReadDaoProvider,
  GetInfoAboutOrderForClientReadDaoProvider,
  GetManyOrdersReadDaoProvider,
  GetAllDeadlinesReadDaoProvider,
];
