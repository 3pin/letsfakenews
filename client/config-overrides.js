const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, NODE_ENV) {
  //do stuff with the webpack config...
  if (NODE_ENV === "production") {
    console.log("⚡ Production");
    config = injectBabelPlugin("transform-remove-console", config);
  }
  return config;
}
