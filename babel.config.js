const path = require('path');

const environment = process.env.ENVIRONMENT || 'development';
require('dotenv').config({path: path.join(__dirname, `.env.${environment}`)});

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src',
        },
      },
    ],
  ],
};
