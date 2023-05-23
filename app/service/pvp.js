const Service = require('egg').Service;

class PvpService extends Service {
  /**
   * @description 获取数据并保存为json
   * @memberof PvpService
   */
  async task() {
    try {
      // 预计执行 33*1500 ms
      const list = await this.service.spider.getList();

      // 保存抓取到数据
      this.service.spider.saveListToFile(list);
      console.log('数据已保存到public/list.json');

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description 读取json数据，并依次下载
   * @return {*}
   * @memberof PvpService
   */
  async download() {
    try {
      // 获取待下载的数据
      const { list, index, item } = await this.service.spider.getWaitingDownloadItem();
      if (index === -1 || item === null) {
        console.log('图片已全部下载完成！');
        return;
      }

      // 下载图片
      await this.service.spider.downloadImage(item.image, item.title, `${index + 1}/${list.length}`);

      // 更新数据
      list[index] = {
        ...item,
        downloaded: true,
      };
      this.service.spider.saveListToFile(list);

    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PvpService;
