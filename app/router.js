'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;

  // socket.io
  io.of('/').route('check', io.controller.log.check);

  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  router.post('/api/download', controller.api.download);
  router.post('/api/refreshAndDownload', controller.api.refreshAndDownload);
};
