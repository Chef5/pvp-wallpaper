const Service = require('egg').Service;

// DOC: https://sequelize.org/api/v6/class/src/model.js~model
// DOC: https://leoric.js.org/api/Bone.html

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
    if (!Array.isArray(wallpapers)) {
      return new Error('insert value must be an array');
    }
    // public static async upsert(values: object, options: object): Promise<Array<Model, boolean|null>>
    // Insert or update a single row. An update will be executed if a row which matches the supplied values on either the primary key or a unique key is found. Note that the unique index must be defined in your sequelize model and not just in the table. Otherwise you may experience a unique constraint violation, because sequelize fails to identify the row that should be updated.
    return await Promise.all(wallpapers.map(async wallpaper => await this.ctx.model.Wallpaper.upsert(wallpaper)));

    // bulkCreate() 只能忽略主键duplicate
    // return await this.ctx.model.Wallpaper.bulkCreate(wallpapers, {
    //   ignoreDuplicates: true, // Ignore duplicate values for primary keys
    //   updateOnDuplicate: [], // Fields to update if row key already exists
    // });
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
