import {
  CreateWorkCommandHandler,
  CreateWorkController,
  RemoveWorkCommandHandler,
  RemoveWorkController,
  UpdateWorkCommandHandler,
  UpdateWorkController,
} from '@modules/order/commands/work';
import {
  CreateClientCommandHandler,
  CreateClientController,
  RemoveClientCommandHandler,
  RemoveClientController,
  UpdateClientCommandHandler,
  UpdateClientController,
} from '@modules/order/commands/client';
import {
  CreateOrderCommandHandler,
  CreateOrderController,
} from '@modules/order/commands/order';

export const commandControllers = [
  CreateWorkController,
  UpdateWorkController,
  RemoveWorkController,
  CreateClientController,
  UpdateClientController,
  RemoveClientController,
  CreateOrderController,
];
export const commandHandlers = [
  CreateWorkCommandHandler,
  UpdateWorkCommandHandler,
  RemoveWorkCommandHandler,
  CreateClientCommandHandler,
  UpdateClientCommandHandler,
  RemoveClientCommandHandler,
  CreateOrderCommandHandler,
];
