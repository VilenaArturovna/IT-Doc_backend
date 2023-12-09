import {
  GetManyProvidersReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
} from '@modules/warehouse/database/read-model';

export const readDaoProviders = [
  GetManyProvidersReadDaoProvider,
  GetOneProviderReadDaoProvider,
  GetManyVendorsReadDaoProvider,
  GetOneVendorReadDaoProvider,
  GetManyWarehouseItemsReadDaoProvider,
  GetOneWarehouseItemReadDaoProvider,
];
