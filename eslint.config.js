module.exports = {
  lint: 'eslint',
  //ignored some files
  //ignored : 'static/libs/**.js',
  ignored: ['lib/{**,**/*}.js'],

  //jshint options
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "jest": false,
    "describe": false,
    "it": false,
    "expect": false,
    "_": false,
    "$": false,
    "__uri": false,
    "__inline": false,
    "fis": false,
    "__NAPI_SOURCE__": false,
    "createUnitStore": false,
    "StateTypes": false
  },
  "rules": {
    "no-underscore-dangle": 0,
    "no-unused-expressions": 1,
    "eol-last": 1,
    "curly": 1,
    "no-unused-vars": 2,
    "no-use-before-define": 2,
    "no-multi-spaces": 1,
    "no-shadow": 2,
    "dot-notation": 2,
    "no-undef": 2,
    "block-scoped-var": 2,
    "no-empty": 1,
    "quotes": [2, "single", "avoid-escape"]
  }
};