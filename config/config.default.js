/* eslint valid-jsdoc: "off" */

'use strict';

// 尺寸枚举
const size = [
  '215x120', // 0
  '1024x768', // 1
  '1280x720', // 2
  '1280x1024', // 3
  '1440x900', // 4
  '1920x1080', // 5
  '1920x1200', // 6
  '1920x1440', // 7
];

const saveSize = 6; // 需要保存的尺寸
const savePath = `/Users/nunet/Pictures/壁纸/pvp-${size[saveSize]}/`; // 保存路径（绝对路径）


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1684770348010_4378';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    wallpaperUrl: 'https://pvp.qq.com/web201605/wallpaper.shtml',
    size,
    saveSize, // 需要保存的尺寸
    savePath, // 保存目录（绝对路径）
    orm: {
      client: '@journeyapps/sqlcipher', // 数据加密
      dialect: 'sqlite',
      database: appInfo.baseDir + '/database/data.db', // 数据存放位置
      connectionLimit: 10, // 连接池数量
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
