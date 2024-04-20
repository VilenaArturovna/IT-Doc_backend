import {
  CreateClientCommandHandler,
  CreateClientController,
  RemoveClientCommandHandler,
  RemoveClientController,
  UpdateClientCommandHandler,
  UpdateClientController,
} from '@modules/order/commands/client';
import {
  UpdateDeadlineCommandHandler,
  UpdateDeadlineController,
} from '@modules/order/commands/deadline';
import {
  CreateOrderCommandHandler,
  CreateOrderController,
  OrderHasBeenApprovedCommandHandler,
  OrderHasBeenApprovedController,
  OrderHasBeenDiagnosedCommandHandler,
  OrderHasBeenDiagnosedController,
  PutInQueueForDiagnosticsCommandHandler,
  PutInQueueForDiagnosticsController,
  StartDiagnosticCommandHandler,
  StartDiagnosticController,
  TakeOrderToWorkCommandHandler,
  TakeOrderToWorkController,
  UpdateOrderCommandHandler,
  UpdateOrderController,
} from '@modules/order/commands/order';
import {
  CreateWorkCommandHandler,
  CreateWorkController,
  RemoveWorkCommandHandler,
  RemoveWorkController,
  UpdateWorkCommandHandler,
  UpdateWorkController,
} from '@modules/order/commands/work';

export const commandControllers = [
  CreateWorkController,
  UpdateWorkController,
  RemoveWorkController,
  CreateClientController,
  UpdateClientController,
  RemoveClientController,
  CreateOrderController,
  UpdateDeadlineController,
  PutInQueueForDiagnosticsController,
  StartDiagnosticController,
  OrderHasBeenDiagnosedController,
  TakeOrderToWorkController,
  UpdateOrderController,
  OrderHasBeenApprovedController,
];
export const commandHandlers = [
  CreateWorkCommandHandler,
  UpdateWorkCommandHandler,
  RemoveWorkCommandHandler,
  CreateClientCommandHandler,
  UpdateClientCommandHandler,
  RemoveClientCommandHandler,
  CreateOrderCommandHandler,
  UpdateDeadlineCommandHandler,
  PutInQueueForDiagnosticsCommandHandler,
  StartDiagnosticCommandHandler,
  OrderHasBeenDiagnosedCommandHandler,
  TakeOrderToWorkCommandHandler,
  UpdateOrderCommandHandler,
  OrderHasBeenApprovedCommandHandler,
];
