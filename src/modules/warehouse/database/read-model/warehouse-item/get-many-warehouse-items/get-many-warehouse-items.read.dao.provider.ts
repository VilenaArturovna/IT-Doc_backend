import { Provider } from '@nestjs/common';

import { GetManyWarehouseItemsObjectionReadDao } from './get-many-warehouse-items.objection.read.dao';
import { GetManyWarehouseItemsReadDao } from './get-many-warehouse-items.read.dao';

export const GetManyWarehouseItemsReadDaoProvider: Provider<GetManyWarehouseItemsReadDao> =
  {
    provide: GetManyWarehouseItemsReadDao,
    useClass: GetManyWarehouseItemsObjectionReadDao,
  };
