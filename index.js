const path = require('path');

module.exports = (api, opts, rootOpts) => {
  const isProd = (process.env.NODE_ENV === "production");

  if(isProd) {
    const { pluginOptions, pages } = opts;
    let { path = "client/" } = pluginOptions &&
    pluginOptions.djangoPlugin ?
    pluginOptions.djangoPlugin : {};

    if (typeof path !== "string") throw new Error("Invalid `path` option provided, it must be a string.");
    path = path.normalize(path).replace(/\\/g, '/');
    if (path.slice(-1) !== "/") path += "/";

    api.chainWebpack(config => {
      if(!pages) {
        config
          .plugin('html')
          .tap(args => {
            args[0].filename = api.resolve(`templates/${path}index.html`);
            return args;
          });
      } else {
        Object
          .keys(pages)
          .forEach(name => {
            config
              .plugin(`html-${name}`)
              .tap(args => {
                args[0].filename = api.resolve(`templates/${path}${name}.html`);
                return args;
              });
          });
      }
    });
  }
}