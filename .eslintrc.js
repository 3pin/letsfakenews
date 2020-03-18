module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-unused-expressions": 0,
    "no-underscore-dangle": 0,
    "max-len": 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }],
    "semi": 0
  }
};
