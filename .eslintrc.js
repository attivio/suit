module.exports = {
  "plugins": [
    "eslint-plugin-flowtype",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks"
  ],
  "env": {
    "browser": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb/hooks",
  ],
  "rules": {
    "max-len": [
      "warn",
      { 
        "code": 130,
        "comments": 200,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreUrls": true,
        "tabWidth": 2,
      }
    ],
    "react/prop-types": [0],
    'arrow-body-style': ['off', 'always'],
    'flowtype/define-flow-type': 1,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'strict': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': 1,
  },
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect",
      "flowVersion": "0.53",
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"},
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"},
    ],
  },
};
