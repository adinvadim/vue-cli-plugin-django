module.exports = (api, opts, rootOpts) => {
  const isProd = (process.env.NODE_ENV === "production");

  if(isProd) {
    const multiPageConfig = opts.pages;
    const { path = "client" } = opts.pluginOptions && opts.pluginOptions.djangoPlugin ? opts.pluginOptions.djangoPlugin : {};

    if (typeof path !== "string") throw new Error("Invalid `path` option provided, it must be a string.");

    api.chainWebpack(config => {
      if(!multiPageConfig) {
        config
          .plugin('html')
          .tap(args => {
            args[0].filename = api.resolve(`templates/${path}/index.html`);
            return args;
          });
      } else {
        const pages = Object.keys(multiPageConfig);
        pages.forEach(name => {
          config
            .plugin(`html-${name}`)
            .tap(args => {
              args[0].filename = api.resolve(`templates/${path}/${name}.html`);
              return args;
            });
        })
      }
    });
  }
}