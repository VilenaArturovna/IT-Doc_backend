const userRoot = 'user';

export const routes = {
  user: {
    root: userRoot,
    byId: `${userRoot}/:id`,
    changePassword: 'change-password',
    getMe: 'get-me',
  },
  auth: {
    signIn: 'sign-in',
    acceptInvite: 'accept-invite:hash',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
  },
};
