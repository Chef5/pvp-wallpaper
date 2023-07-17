/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const Service = require('egg').Service;

class SpiderService extends Service {

  /**
   * @description 通过接口获取壁纸数据
   * @param [page=0]
   * @param [iListNum=20]
   * @return {*}
   * @memberof SpiderService
   */
  async getListByAPI(page = 0, iListNum = 20) {
    const { ctx } = this;
    const api = 'https://apps.game.qq.com/cgi-bin/ams/module/ishow/V1.0/query/workList_inc.cgi';
    const params = {
      activityId: 2735,
      sVerifyCode: 'ABCD',
      sDataType: 'JSON',
      iListNum,
      totalpage: 0,
      page,
      iOrder: 1, // 1时间排序，0热度排序
      iSortNumClose: 1,
      // jsoncallback: jQuery11130010839686936504167_1689486132948,
      iAMSActivityId: 51991,
      _everyRead: true,
      iTypeId: 2,
      iFlowId: 267733,
      iActId: 2735,
      iModuleId: 2735,
      _: new Date().getTime(),
    };
    const result = await ctx.curl(api, {
      method: 'GET',
      dataAsQueryString: true,
      data: params,
      dataType: 'json',
    });
    if (result.status !== 200) {
      console.log(result);
      this.service.logger.error('API error');
      throw new Error('API error');
    }
    return result.data;

  }

  /**
   * @description 保存图片到指定目录
   * @param savePath 保存路径
   * @param imgUrl 图片链接
   * @param imgName 图片名称
   * @param process 进度
   * @return {*}
   * @memberof SpiderService
   */
  async downloadImage(savePath, imgUrl, imgName, process) {
    const { ctx } = this;
    const fileNum = imgUrl.split('_')[2];
    const fileName = `${imgName}-${fileNum}.jpeg`;
    const filePath = path.join(savePath, fileName);

    if (!fs.existsSync(savePath)) {
      try {
        fs.mkdirSync(savePath);
      } catch (error) {
        throw error;
      }
    }

    try {
      fs.accessSync(filePath);
      this.service.logger.text(`(${process})已存在，忽略下载：${fileName}`);
      return Promise.resolve();
    } catch (error) {
      const result = await ctx.curl(imgUrl, { dataType: 'buffer' });
      fs.writeFileSync(filePath, result.data);
      this.service.logger.text(`(${process})下载完成：${fileName}`);
      return Promise.resolve();
    }
  }

}

module.exports = SpiderService;
