const gitignore = require('parse-gitignore');
module.exports = (api, options, rootOptions) => {
  /*
    Wait https://github.com/vuejs/vue-cli/issues/845
    api.extendGitignore([
      '/templates',
      '/static',
    ])
  */
  
  api.extendPackage({
    outputDir: 'static',
    baseUrl: '/static',
    pluginOptions: {
      djangoPlugin: {
        path: options.path,
      },
    },
  });

  api.render('./templates', { options });

  api.onCreateComplete(() => {
    const fs = require('fs')

    const gitignorePath = api.resolve('./.gitignore')
    const gitignorePatterns = gitignore(gitignorePath);
    let content

    if (fs.existsSync(gitignorePath)) {
      content = fs.readFileSync(gitignorePath, { encoding: 'utf8' })
    } else {
      content = ''
    }
    if(!gitignorePatterns.includes('templates/**')) {
      content += '\n/templates\n'
    }
    if(!gitignorePatterns.includes('static/**')) {
      content += '\n/static\n'
    }

    fs.writeFileSync(gitignorePath, content, { encoding: 'utf8' })
  });
}