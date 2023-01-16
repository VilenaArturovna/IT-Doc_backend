import {
  GetManyProvidersController,
  GetManyProvidersQueryHandler,
  GetOneProviderController,
  GetOneProviderQueryHandler,
} from '@modules/warehouse/queries/provider';
import {
  GetManyServicesController,
  GetManyServicesQueryHandler,
  GetOneServiceController,
  GetOneServiceQueryHandler,
} from '@modules/warehouse/queries/service';
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
export * from './service';
export * from './vendor';
export * from './warehouse-item';

export const queryControllers = [
  GetManyProvidersController,
  GetOneProviderController,
  GetManyServicesController,
  GetOneServiceController,
  GetManyVendorsController,
  GetOneVendorController,
  GetManyWarehouseItemsController,
  GetOneWarehouseItemController,
];
export const queryHandlers = [
  GetManyProvidersQueryHandler,
  GetOneProviderQueryHandler,
  GetManyServicesQueryHandler,
  GetOneServiceQueryHandler,
  GetManyVendorsQueryHandler,
  GetOneVendorQueryHandler,
  GetManyWarehouseItemsQueryHandler,
  GetOneWarehouseItemQueryHandler,
];
