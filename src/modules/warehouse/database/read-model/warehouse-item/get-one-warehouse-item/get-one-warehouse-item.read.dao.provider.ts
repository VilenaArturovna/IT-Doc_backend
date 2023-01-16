import { Provider } from '@nestjs/common';

import { GetOneWarehouseItemObjectionReadDao } from './get-one-warehouse-item.objection.read.dao';
import { GetOneWarehouseItemReadDao } from './get-one-warehouse-item.read.dao';

export const GetOneWarehouseItemReadDaoProvider: Provider<GetOneWarehouseItemReadDao> =
  {
    provide: GetOneWarehouseItemReadDao,
    useClass: GetOneWarehouseItemObjectionReadDao,
  };
