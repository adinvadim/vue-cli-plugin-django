module.exports = (api, opts, rootOpts) => {
  api.chainWebpack(config => {
    config
      .plugin('html')
      .tap(args => {
        return [{ filename: api.resolve('templates/client/index.html') }]
      });
  })
}
