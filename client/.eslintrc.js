module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es6: true,
    mocha: true
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  env: {
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "max-len": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "react/jsx-no-bind": 0,
    "jsx-a11y/no-autofocus": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0,
    "no-console": 0,
    "no-alert": 0,
    "react/prop-types": 0,
    "no-array-index-key": 0
  }
};
