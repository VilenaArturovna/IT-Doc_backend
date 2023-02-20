const staffRoot = 'staff';
const warehouseItemRoot = 'warehouse';
const providerRoot = 'provider';
const vendorRoot = 'vendor';
const workRoot = 'work';
const clientRoot = 'client';
const orderRoot = 'order';
const orderById = `${orderRoot}/:id`;
const deadlineRoot = 'deadline';

export const routes = {
  staff: {
    root: staffRoot,
    byId: `${staffRoot}/:id`,
    changePassword: 'change-password',
    getMe: 'get-me',
    auth: {
      signIn: 'sign-in',
      acceptInvite: 'accept-invite:hash',
      forgotPassword: 'forgot-password',
      resetPassword: 'reset-password',
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
  },
  deadline: {
    root: deadlineRoot,
    byId: `${deadlineRoot}/:id`,
  },
};
