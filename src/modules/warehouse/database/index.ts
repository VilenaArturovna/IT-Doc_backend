import {
  ProviderObjectionRepository,
  ServiceObjectionRepository,
  VendorObjectionRepository,
  WarehouseItemObjectionRepository,
} from '@modules/warehouse/database/repositories';

import {
  GetManyProvidersReadDaoProvider,
  GetManyServicesReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetOneServiceReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
} from '@modules/warehouse/database/read-model';

export const repositories = [
  WarehouseItemObjectionRepository,
  ProviderObjectionRepository,
  ServiceObjectionRepository,
  VendorObjectionRepository,
];
export const readDaoProviders = [
  GetManyProvidersReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetManyServicesReadDaoProvider,
  GetOneServiceReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
];
