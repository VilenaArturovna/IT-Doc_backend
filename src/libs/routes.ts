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
const telegramWebhookRoot = 'telegram/webhook';

export const routes = {
  staff: {
    root: staffRoot,
    byId: `${staffRoot}/:id`,
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
    certificateOfTechnicalCondition: `${orderById}/certificate-of-technical-condition`,
  },
  deadline: {
    root: deadlineRoot,
    byId: `${deadlineRoot}/:id`,
  },
  task: {
    root: tasksRoot,
    byId: taskById,
    addComment: `${taskById}/comment`,
    complete: `${taskById}/complete`,
    markAsRead: `${taskById}/mark-as-read`,
    takeToWork: `${taskById}/take-to-work`,
  },
  telegram: {
    webhook: telegramWebhookRoot,
    updates: `${telegramWebhookRoot}/updates`,
  },
};
