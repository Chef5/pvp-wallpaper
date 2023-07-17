'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { size, saveSize, savePath } = this.config;
    const count = await this.service.wallpaper.count();
    await this.ctx.render('/index.ejs', {
      count,
      size,
      saveSize,
      savePath,
    });
  }
  async list() {
    const { size } = this.config;
    const list = await this.service.wallpaper.getList();
    await this.ctx.render('/list.ejs', {
      list,
      size,
    });
  }
}

module.exports = HomeController;
