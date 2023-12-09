import {
  GetManyClientsReadDaoProvider,
  GetManyWorksReadDaoProvider,
  GetOneClientReadDaoProvider,
  GetOneWorkReadDaoProvider,
} from '@modules/order/database/read-model';

export const readDaoProviders = [
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
  GetManyClientsReadDaoProvider,
  GetOneClientReadDaoProvider,
];
