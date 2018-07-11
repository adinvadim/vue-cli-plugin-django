const path = require('path');

module.exports = (api, opts, rootOpts) => {
  const isProd = (process.env.NODE_ENV === "production");

  if(isProd) {
    const { pluginOptions, pages } = opts;
    let { subpath = "client/" } = pluginOptions &&
    pluginOptions.djangoPlugin ?
    pluginOptions.djangoPlugin : {};

    if (typeof subpath !== "string") throw new Error("Invalid `path` option provided, it must be a string.");

    subpath = path.normalize(subpath).replace(/\\/g, '/');
    if (subpath.slice(-1) !== "/") subpath += "/";

    api.chainWebpack(config => {
      if(!pages) {
        config
          .plugin('html')
          .tap(args => {
            args[0].filename = api.resolve(`templates/${subpath}index.html`);
            return args;
          });
      } else {
        Object
          .keys(pages)
          .forEach(name => {
            config
              .plugin(`html-${name}`)
              .tap(args => {
                args[0].filename = api.resolve(`templates/${subpath}${name}.html`);
                return args;
              });
          });
      }
    });
  }
};
