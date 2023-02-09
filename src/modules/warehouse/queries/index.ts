import {
  GetManyProvidersController,
  GetManyProvidersQueryHandler,
  GetOneProviderController,
  GetOneProviderQueryHandler,
} from '@modules/warehouse/queries/provider';
import {
  GetManyVendorsController,
  GetManyVendorsQueryHandler,
  GetOneVendorController,
  GetOneVendorQueryHandler,
} from '@modules/warehouse/queries/vendor';
import {
  GetManyWarehouseItemsController,
  GetManyWarehouseItemsQueryHandler,
  GetOneWarehouseItemController,
  GetOneWarehouseItemQueryHandler,
} from '@modules/warehouse/queries/warehouse-item';

export * from './provider';
export * from './vendor';
export * from './warehouse-item';

export const queryControllers = [
  GetManyProvidersController,
  GetOneProviderController,
  GetManyVendorsController,
  GetOneVendorController,
  GetManyWarehouseItemsController,
  GetOneWarehouseItemController,
];
export const queryHandlers = [
  GetManyProvidersQueryHandler,
  GetOneProviderQueryHandler,
  GetManyVendorsQueryHandler,
  GetOneVendorQueryHandler,
  GetManyWarehouseItemsQueryHandler,
  GetOneWarehouseItemQueryHandler,
];
