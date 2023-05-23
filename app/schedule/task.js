module.exports = {
  schedule: {
    interval: '1d', // 1天间隔
    type: 'all', // 指定所有的 worker 都需要执行
    options: {
      timeout: 180000, // 180秒
    },
    immediate: true,
  },
  async task(ctx) {
    // 获取数据并保存为json 预计执行 33*1500 ms
    await ctx.service.pvp.task();
  },
};
