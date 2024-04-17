import { Provider } from '@nestjs/common';

import { GetInfoAboutOrderForClientObjectionReadDao } from './get-info-about-order-for-client.objection.read.dao';
import { GetInfoAboutOrderForClientReadDao } from './get-info-about-order-for-client.read.dao';

export const GetInfoAboutOrderForClientReadDaoProvider: Provider<GetInfoAboutOrderForClientReadDao> =
  {
    provide: GetInfoAboutOrderForClientReadDao,
    useClass: GetInfoAboutOrderForClientObjectionReadDao,
  };
