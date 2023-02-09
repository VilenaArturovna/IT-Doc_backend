import { WorkObjectionRepository } from '@modules/order/database/repositories';
import {
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
} from '@modules/order/database/read-model';

export const repositories = [WorkObjectionRepository];
export const readDaoProviders = [
  GetManyWorksReadDaoProvider,
  GetOneWorkReadDaoProvider,
];
