/* eslint valid-jsdoc: "off" */

'use strict';

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

  return {
    ...config,
    ...userConfig,
  };
};
