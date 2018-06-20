# vue-cli-plugin-django

[![vue-cli3](https://img.shields.io/badge/vue--cli-3.x-brightgreen.svg)](https://github.com/vuejs/vue-cli)


**Features:**

- Make your awesome project as Django application
- Included urls.py with config for your vue-router

## Getting started

:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

If you don't have a project created with vue-cli 3.x yet:

```
vue create my-new-app
```

Navigate to the newly created project folder and add the cli plugin:

```
cd my-new-app
vue add django
```

You can specify an output path in your vue.config.js for your templates.

```javascript
module.exports = {
    pluginOptions: {
        djangoPlugin: {
            path: "your/path"
        }
    }
}
```