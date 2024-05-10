import {
  GetManyTasksReadDaoProvider,
  GetOneTaskReadDaoProvider,
} from '@modules/task/database/read-model';

export const readDaoProviders = [
  GetOneTaskReadDaoProvider,
  GetManyTasksReadDaoProvider,
];
