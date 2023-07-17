const Service = require('egg').Service;

class WallpaperService extends Service {

  /**
   * @description 获取全部列表
   * @return {*}
   * @memberof WallpaperService
   */
  async getList() {
    return await this.ctx.model.Wallpaper.find();
  }

  /**
   * @description 获取名称列表
   * @return {*}
   * @memberof WallpaperService
   */
  async getTitleList() {
    return await this.ctx.model.Wallpaper.find().select('title');
  }

  /**
   * @description 增
   * @param wallpaper
   * @return {*}
   * @memberof WallpaperService
   */
  async create(wallpaper) {
    return await this.ctx.model.Wallpaper.create(wallpaper);
  }

  /**
   * @description 批量增
   * @param wallpapers
   * @return {*}
   * @memberof WallpaperService
   */
  async bulkCreate(wallpapers) {
    return await this.ctx.model.Wallpaper.bulkCreate(wallpapers, {
      ignoreDuplicates: true,
    });
  }

  /**
   * @description 删
   * @param title
   * @return {*}
   * @memberof WallpaperService
   */
  async remove(title) {
    return await this.ctx.model.Wallpaper.remove({
      title,
    });
  }

  /**
   * @description 改
   * @param title
   * @param wallpaper
   * @return {*}
   * @memberof WallpaperService
   */
  async update(title, wallpaper) {
    return await this.ctx.model.Wallpaper.update({
      title,
    }, wallpaper);
  }

  /**
   * @description 查
   * @param title
   * @return {*}
   * @memberof WallpaperService
   */
  async query(title) {
    return await this.ctx.model.Wallpaper.find({
      title,
    });
  }

  /**
   * @description 最后一条记录
   * @return {*}
   * @memberof WallpaperService
   */
  async latest() {
    return await this.ctx.model.Wallpaper.findOne().order({ created_at: 'desc' });
  }

  /**
   * @description 总数
   * @return {*}
   * @memberof WallpaperService
   */
  async count() {
    return await this.ctx.model.Wallpaper.count();
  }

}

module.exports = WallpaperService;
