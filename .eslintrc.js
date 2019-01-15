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
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: true }],
    // Consider removing these?
    'react/no-access-state-in-setstate': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'object-curly-newline': 0,
    'react/destructuring-assignment': 0,
    'prefer-destructuring': 0,
    'lines-between-class-members': 0,
    'react/no-unused-state': 0,
    'react/require-default-props': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
};
