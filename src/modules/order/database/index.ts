import {
  ClientObjectionRepository,
  OrderObjectionRepository,
  WorkObjectionRepository,
} from '@modules/order/database/repositories';
import {
  GetManyClientsReadDaoProvider,
  GetManyWorksReadDaoProvider,
  GetOneClientReadDaoProvider,
  GetOneWorkReadDaoProvider,
} from '@modules/order/database/read-model';

export const repositories = [
  WorkObjectionRepository,
  ClientObjectionRepository,
  OrderObjectionRepository,
];
export const readDaoProviders = [
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
  GetManyClientsReadDaoProvider,
  GetOneClientReadDaoProvider,
];
