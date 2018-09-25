module.exports = {
  'env': {
    'browser': true
  },
  'parser': 'babel-eslint',
  'extends': 'airbnb',
  'plugins': [
    'eslint-plugin-flowtype',
  ],
  'rules': {
    'arrow-body-style': ['error', 'always'],
    'flowtype/define-flow-type': 1,
    'jsx-a11y/label-has-for': 0,
    'max-len': [1, 132, 2],
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'strict': 0,
    'no-console': ['error', {allow: ['warn', 'error']}],
  },
};
