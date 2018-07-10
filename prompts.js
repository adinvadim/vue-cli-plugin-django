const path = require('path');

module.exports = [
  {
    type: 'confirm',
    default: true,
    message: 'Do you use the History Mode of vue-router?',
    name: 'history',
  },
  {
    type: 'input',
    default: 'client/',
    message: 'Enter your templates path',
    name: 'path',
    filter(input) {
      input = path.normalize(input).replace(/\\/g, '/');
      if (input.slice(-1) !== "/") input += "/";
      return input;
    }
  }
];