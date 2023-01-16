const staffRoot = 'staff';
const warehouseItemRoot = 'warehouse';
const providerRoot = 'provider';
const vendorRoot = 'vendor';
const serviceRoot = 'service';

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
  service: {
    root: serviceRoot,
    byId: `${serviceRoot}/:id`,
  },
};