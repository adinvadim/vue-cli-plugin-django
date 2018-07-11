const fs = require('fs'),
      gitignore = require('parse-gitignore');

module.exports = (api, options, rootOptions) => {
  /*
    Wait https://github.com/vuejs/vue-cli/issues/845
    api.extendGitignore([
      '/templates',
      '/static',
    ]);
  */

  const vue = {
    outputDir: 'static',
    baseUrl: '/static',
  };

  if (!/^client\/*$/.test(options.subpath)) {
    vue.pluginOptions = {
      djangoPlugin: {
        subpath: options.subpath,
      },
    };
  }
  
  api.extendPackage({ vue });

  api.render('./templates', { options });

  api.onCreateComplete(() => {
    const gitignorePath = api.resolve('./.gitignore'),
          gitignorePatterns = gitignore(gitignorePath);
    
    let content = '';

    if (fs.existsSync(gitignorePath)) {
      content = fs.readFileSync(gitignorePath, { encoding: 'utf8' });
    }
    
    if(!gitignorePatterns.includes('templates/**')) {
      content += '\n/templates\n';
    }
    
    if(!gitignorePatterns.includes('static/**')) {
      content += '\n/static\n';
    }

    fs.writeFileSync(gitignorePath, content, { encoding: 'utf8' });
  });
};
