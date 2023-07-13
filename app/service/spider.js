/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const Service = require('egg').Service;

class SpiderService extends Service {

  /**
   * @description 获取浏览器
   * @return {*}
   * @memberof SpiderService
   */
  async getBrowser() {
    const browser = await puppeteer.launch({
      headless: true,
      args: [ '--no-sandbox' ],
    });
    return browser;
  }

  /**
   * @description 获取壁纸
   * @return {*}
   * @memberof SpiderService
   */
  async getList() {
    const { wallpaperUrl, size } = this.config;
    console.log(wallpaperUrl);
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.goto(wallpaperUrl);

    const getCurrentList = (page, size) => page.evaluate(async s => {
      const list = [];
      try {
        const listItems = document.querySelectorAll('.p_listmain_l .p_hd .p_newhero_item');
        for (let i = 0; i < listItems.length; i++) {
          const imgDom = listItems[i].querySelector('img');
          const liDom = listItems[i].querySelector(`li.sProdImgL${s} a`);
          console.log(imgDom);
          list.push({
            title: imgDom.alt,
            image: liDom.href,
            downloaded: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
      return list;
    }, size);

    await page.waitForTimeout(1500);
    const pager = await page.$eval('.totalpage', el => el.innerText);
    const totalPage = Number(pager.split('/').pop()) || 1;
    console.log(`总共：${totalPage}页`);
    let next = true;
    let list = [];
    while (next) {
      const currentPage = await page.$eval('.currentP', el => Number(el.innerText || 1));
      console.log(`第${currentPage}页 开始处理...`);

      const currentList = await getCurrentList(page, size);

      list = [
        ...list,
        ...currentList,
      ];

      console.log(`第${currentPage}页 处理完成！当前获取数据${list.length}条\n`);

      if (currentPage >= totalPage) {
        next = false;
        break;
      }

      const pageDown = await page.$$('.downpage');
      await pageDown[0].click();
      await page.waitForTimeout(1500);
    }


    await browser.close();

    console.log(`全部链接获取完成！当前获取到${list.length}条`);
    return list;
  }

  /**
   * @description 将列表保存到public目录下
   * @param list
   * @memberof SpiderService
   */
  saveListToFile(list) {
    const filePath = path.join(__dirname, '../public/list.json');
    fs.writeFileSync(filePath, JSON.stringify(list));
  }

  /**
   * @description 获取待下载的数据
   * @return {*}
   * @memberof SpiderService
   */
  async getWaitingDownloadItem() {
    const filePath = path.join(__dirname, '../public/list.json');
    const listData = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(listData);
    const index = list.findIndex(item => item.downloaded === false);
    return { list, index, item: index !== -1 ? list[index] : null };
  }

  /**
   * @description 保存图片
   * @param list
   * @return {*}
   * @memberof SpiderService
   */
  async saveImage(list) {
    const result = await Promise.all(list.map((item, index, arr) => this.downloadImage(item.image, item.title, `${index + 1}/${arr.length}`)));
    return result;
  }


  /**
   * @description 保存图片到指定目录
   * @param imgUrl 图片链接
   * @param imgName 图片名称
   * @param process 进度
   * @return {*}
   * @memberof SpiderService
   */
  async downloadImage(imgUrl, imgName, process) {
    const { ctx } = this;
    const { savePath } = this.config;
    const fileName = `${imgName}.jpeg`;
    const filePath = path.join(savePath, fileName);

    try {
      fs.accessSync(filePath);
      console.log(`(${process})已存在，忽略下载：${imgName}`);
      return true;
    } catch (error) {
      const result = await ctx.curl(imgUrl, { dataType: 'buffer' });
      fs.writeFileSync(filePath, result.data);
      console.log(`(${process})下载完成：${imgName}`);
      return true;
    }
  }

}

module.exports = SpiderService;
