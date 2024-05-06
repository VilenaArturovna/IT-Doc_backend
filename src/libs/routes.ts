const staffRoot = 'staff';
const warehouseItemRoot = 'warehouses';
const providerRoot = 'provider';
const vendorRoot = 'vendors';
const workRoot = 'works';
const clientRoot = 'clients';
const orderRoot = 'orders';
const orderById = `${orderRoot}/:id`;
const deadlineRoot = 'deadlines';
const tasksRoot = 'tasks';
const taskById = `${tasksRoot}/:id`;

export const routes = {
  staff: {
    root: staffRoot,
    byId: `${staffRoot}/:id`,
    changePassword: 'change-password',
    getMe: 'get-me',
    auth: {
      login: 'login',
    },
  },
  warehouseItem: {
    root: warehouseItemRoot,
    byId: `${warehouseItemRoot}/:id`,
  },
  provider: {
    root: providerRoot,
    byId: `${providerRoot}/:id`,
  },
  vendor: {
    root: vendorRoot,
    byId: `${vendorRoot}/:id`,
  },
  work: {
    root: workRoot,
    byId: `${workRoot}/:id`,
  },
  client: {
    root: clientRoot,
    byId: `${clientRoot}/:id`,
  },
  order: {
    root: orderRoot,
    byId: orderById,
    putInQueueForDiagnostics: `${orderById}/in-queue-for-diagnostics`,
    startDiagnostic: `${orderById}/start-diagnostic`,
    diagnosed: `${orderById}/diagnosed`,
    approved: `${orderById}/approved`,
    takeToWork: `${orderById}/take-to-work`,
    ready: `${orderById}/ready`,
    complete: `${orderById}/complete`,
    infoForClient: `info-about-order`,
  },
  deadline: {
    root: deadlineRoot,
    byId: `${deadlineRoot}/:id`,
  },
  task: {
    root: tasksRoot,
    byId: taskById,
  },
};
