import {
  ProviderObjectionRepository,
  VendorObjectionRepository,
  WarehouseItemObjectionRepository,
} from '@modules/warehouse/database/repositories';

import {
  GetManyProvidersReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
} from '@modules/warehouse/database/read-model';

export const repositories = [
  WarehouseItemObjectionRepository,
  ProviderObjectionRepository,
  VendorObjectionRepository,
];
export const readDaoProviders = [
  GetManyProvidersReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
];
