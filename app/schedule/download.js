module.exports = {
  schedule: {
    interval: '5s', // 5秒间隔
    type: 'all', // 指定所有的 worker 都需要执行
    options: {
      timeout: 5000, // 5秒
    },
    immediate: true,
  },
  async task(ctx) {
    // 读取json数据，并依次下载 预计执行 653*5 s
    // await ctx.service.pvp.download();
  },
};
