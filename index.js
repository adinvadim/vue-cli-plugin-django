const path = require('path');

module.exports = (api, opts, rootOpts) => {
  const isProd = (process.env.NODE_ENV === "production");

  if(isProd) {
    const { pluginOptions, pages } = opts;
    let { path: templatePath = "client/" } = pluginOptions &&
    pluginOptions.djangoPlugin ?
    pluginOptions.djangoPlugin : {};

    if (typeof templatePath !== "string") throw new Error("Invalid `path` option provided, it must be a string.");

    templatePath = path.normalize(templatePath).replace(/\\/g, '/');
    if (templatePath.slice(-1) !== "/") templatePath += "/";

    api.chainWebpack(config => {
      if(!pages) {
        config
          .plugin('html')
          .tap(args => {
            args[0].filename = api.resolve(`templates/${templatePath}index.html`);
            return args;
          });
      } else {
        Object
          .keys(pages)
          .forEach(name => {
            config
              .plugin(`html-${name}`)
              .tap(args => {
                args[0].filename = api.resolve(`templates/${templatePath}${name}.html`);
                return args;
              });
          });
      }
    });
  }
};
