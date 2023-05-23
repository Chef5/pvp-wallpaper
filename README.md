# pvp-wallpaper

王者荣耀壁纸批量下载器，可以批量保存官方壁纸

> 本项目仅用于学习`puppeteer`，项目完整演示了内容获取、页面交互、数据保存等基本用法

## 一、获取项目

``` bash
$ git clone https://github.com/Chef5/pvp-wallpaper.git
$ cd pvp-wallpaper
$ yarn
```

## 二、执行下载任务

### 2.1 修改配置文件

`config/config.default.js`：修改保存目录`savePath`和需要的尺寸`size`

``` js
const userConfig = {
  wallpaperUrl: 'https://pvp.qq.com/web201605/wallpaper.shtml',
  savePath: '/Users/Chef5/Pictures/壁纸/pvp-1080/', // 保存目录（绝对路径）
  size: '6', // 需要保存的尺寸
  // 2 1024x768
  // 3 1280x720
  // 4 1280x1024
  // 5 1440x900
  // 6 1920x1080
  // 7 1920x1200
  // 8 1920x1440
};
```

### 2.2 缓存列表

本项目已缓存了`1920x1080`的列表，如果需要该尺寸的就可以跳过本步骤！

修改`app/schedule/download.js`，注释`task(ctx)`内部代码：

``` js
async task(ctx) {
  // 读取json数据，并依次下载 预计执行 653*5 s
  // await ctx.service.pvp.download();
},
```

修改`app/schedule/task.js`，将`task(ctx)`内部代码注释去掉：

``` js
async task(ctx) {
  // 获取数据并保存为json 预计执行 33*1500 ms
  await ctx.service.pvp.task();
},
```

开始缓存列表：

``` bash
$ yarn dev
```

观察终端输出，全部链接获取完成后，停止运行项目`ctrl+c`，进行下一步

### 2.3 执行下载

修改`app/schedule/task.js`，注释`task(ctx)`内部代码：

``` js
async task(ctx) {
  // 获取数据并保存为json 预计执行 33*1500 ms
  // await ctx.service.pvp.task();
},
```

修改`app/schedule/download.js`，将`task(ctx)`内部代码注释去掉：

``` js
async task(ctx) {
  // 读取json数据，并依次下载 预计执行 653*5 s
  await ctx.service.pvp.download();
},
```

开始下载：

``` bash
$ yarn dev
```

观察终端输出，当`图片已全部下载完成！`时，可以结束运行本项目了。

## 三、参考文档

- eggjs: [https://www.eggjs.org/zh-CN/basics](https://www.eggjs.org/zh-CN/basics)
- puppeteer: [https://pptr.dev/api/puppeteer.page](https://pptr.dev/api/puppeteer.page)