const Service = require('egg').Service;

class PvpService extends Service {
  /**
   * @description 获取数据并保存为json
   * @param updateLocalDatabase 是否需要更新本地数据库
   * @memberof PvpService
   */
  async task(updateLocalDatabase = false) {
    if (updateLocalDatabase) {
      const wallpaperList = await this.getWallpaperListFromOfficialWebsite();
      await this.updateLocalDatabase(wallpaperList);
    }
    await this.downloadWallpaper();
  }

  /**
   * @description 从官网获取新数据
   * @return {*}
   * @memberof PvpService
   */
  async getWallpaperListFromOfficialWebsite() {
    console.log('-----从官网获取新数据--------------');
    const databaseCount = await this.service.wallpaper.count();
    let list = [];
    try {
      const pre = await this.service.spider.getListByAPI(0, 80);
      const { iTotalLines, iTotalPages } = pre;
      console.log(iTotalLines, iTotalPages, databaseCount);
      console.log('本地数据：', databaseCount);
      console.log('官网数据：', iTotalLines);
      console.log('官网分页数(80/p)：', iTotalPages);
      if (databaseCount < iTotalLines) {
        for (let page = iTotalPages - 1; page >= 0; page--) {
          const res = await this.service.spider.getListByAPI(page, 80);
          const l = res.List;
          l.reverse();
          list = [
            ...list,
            ...l,
          ];
        }
        return list;
      }
      console.log('-----无更新--------------');
      return [];
    } catch (error) {
      return [];
    }
  }

  /**
   * @description 更新数据库
   * @param list
   * @return {*}
   * @memberof PvpService
   */
  async updateLocalDatabase(list) {
    console.log('-----更新本地数据库--------------');
    const getUrl = str => decodeURIComponent(str).replace('/200', '/0');
    return await this.service.wallpaper.bulkCreate(list.map(t => ({
      title: decodeURIComponent(t.sProdName),
      image1: getUrl(t.sProdImgNo_1),
      image2: getUrl(t.sProdImgNo_2),
      image3: getUrl(t.sProdImgNo_3),
      image4: getUrl(t.sProdImgNo_4),
      image5: getUrl(t.sProdImgNo_5),
      image6: getUrl(t.sProdImgNo_6),
      image7: getUrl(t.sProdImgNo_7),
      image8: getUrl(t.sProdImgNo_8),
      time: decodeURIComponent(t.dtInputDT),
    })));
  }

  /**
   * @description 下载
   * @memberof PvpService
   */
  async downloadWallpaper() {
    console.log('-----执行下载--------------');
    const { saveSize, savePath, size } = this.config;
    if (saveSize < 0 || saveSize > 7) {
      throw new Error('saveSize 配置错误 in config.default.js');
    }
    console.log('下载尺寸：', size[saveSize]);
    console.log('下载路径：', savePath);
    const list = await this.service.wallpaper.getList();
    for (let index = 0; index < list.length; index++) {
      await this.service.spider.downloadImage(list[index][`image${saveSize + 1}`], list[index].title, `${index + 1}/${list.length}`);
    }
  }
}

module.exports = PvpService;
