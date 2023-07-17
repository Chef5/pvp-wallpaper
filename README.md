# pvp-wallpaper

王者荣耀壁纸批量下载器，可以批量保存官方壁纸

![pvp-wallpaper.png](http://img.cdn.1zdz.cn/github/readme/pvp-wallpaper.png)

## 一、获取项目

``` bash
$ git clone https://github.com/Chef5/pvp-wallpaper.git
$ cd pvp-wallpaper
$ yarn
```

## 二、运行

``` bash
$ yarn dev
```

浏览器打开：http://127.0.0.1:7001/

修改`下载路径`、`下载尺寸`；

> 或修改项目配置文件`config/config.default.js`中的`savePath`、`saveSize`

本项目已经缓存了官网`665`条壁纸数据，可以直接点击页面的`下载壁纸`按钮；

若官网已上新壁纸，可点击`更新数据并下载`按钮；

## 三、参考文档

- eggjs: [https://www.eggjs.org/zh-CN/basics](https://www.eggjs.org/zh-CN/basics)
- puppeteer: [https://pptr.dev/api/puppeteer.page](https://pptr.dev/api/puppeteer.page)