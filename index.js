module.exports = (api, opts, rootOpts) => {
  const isProd = process.env.NODE_ENV === 'production';
  const multiPageConfig = opts.pages;

  api.chainWebpack(config => {
    if(isProd) {
      if(!multiPageConfig) {
        config
          .plugin('html')
          .tap(args => {
            args[0].filename = api.resolve('templates/client/index.html');
            return args;
          });
      } else {
        const pages = Object.keys(multiPageConfig);
        pages.forEach(name => {
          config
            .plugin(`html-${name}`)
            .tap(args => {
              args[0].filename = api.resolve(`templates/client/${name}.html`);
              return args;
            });
        })
      }
    }
  })
}
