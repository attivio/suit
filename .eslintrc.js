module.exports = {
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "eslint-plugin-flowtype",
  ],
  "rules": {
    "strict": 0,
    "arrow-body-style": ["error", "always"],
    "react/prefer-stateless-function": 0,
    "max-len": [1, 132, 2],
    "jsx-a11y/label-has-for": 0,
    "flowtype/define-flow-type": 1,
  },
};