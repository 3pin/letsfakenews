//const { injectBabelPlugin } = require("react-app-rewired");

/*
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  devServer: {
    historyApiFallback: true
  }
  return config;
}
*/


const {
  override,
  addBabelPlugins
} = require("customize-cra");
const path = require("path");
module.exports = override(
  ...addBabelPlugins(
    //"babel-plugin-transform-remove-console"
  )
);
