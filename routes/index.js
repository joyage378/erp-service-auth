module.exports = {
  authRouter: (router) => {
    require('./users/routes')(router);
  },
  openRouter: (router) => {
  }
};