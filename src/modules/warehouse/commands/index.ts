import {
  CreateProviderCommandHandler,
  CreateProviderController,
  RemoveProviderCommandHandler,
  RemoveProviderController,
  UpdateProviderCommandHandler,
  UpdateProviderController,
} from '@modules/warehouse/commands/provider';
import {
  CreateVendorCommandHandler,
  CreateVendorController,
  RemoveVendorCommandHandler,
  RemoveVendorController,
  UpdateVendorCommandHandler,
  UpdateVendorController,
} from '@modules/warehouse/commands/vendor';
import {
  CreateServiceCommandHandler,
  CreateServiceController,
  RemoveServiceCommandHandler,
  RemoveServiceController,
  UpdateServiceCommandHandler,
  UpdateServiceController,
} from '@modules/warehouse/commands/service';
import {
  ArchiveWarehouseItemCommandHandler,
  ArchiveWarehouseItemController,
  CreateWarehouseItemCommandHandler,
  CreateWarehouseItemController,
  UpdateWarehouseItemCommandHandler,
  UpdateWarehouseItemController,
} from '@modules/warehouse/commands/warehouse-item';

export const commandControllers = [
  CreateProviderController,
  UpdateProviderController,
  RemoveProviderController,
  CreateVendorController,
  UpdateVendorController,
  RemoveVendorController,
  CreateServiceController,
  UpdateServiceController,
  RemoveServiceController,
  CreateWarehouseItemController,
  UpdateWarehouseItemController,
  ArchiveWarehouseItemController,
];
export const commandHandlers = [
  CreateProviderCommandHandler,
  UpdateProviderCommandHandler,
  RemoveProviderCommandHandler,
  CreateVendorCommandHandler,
  UpdateVendorCommandHandler,
  RemoveVendorCommandHandler,
  CreateServiceCommandHandler,
  UpdateServiceCommandHandler,
  RemoveServiceCommandHandler,
  CreateWarehouseItemCommandHandler,
  UpdateWarehouseItemCommandHandler,
  ArchiveWarehouseItemCommandHandler,
];
