import {
  ClientObjectionRepository,
  DeadlineObjectionRepository,
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
  DeadlineObjectionRepository,
];
export const readDaoProviders = [
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
  GetManyClientsReadDaoProvider,
  GetOneClientReadDaoProvider,
];
