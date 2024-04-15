import {
  GetManyClientsReadDaoProvider,
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
];
