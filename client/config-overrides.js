module.exports = function override(config, env) {
  //do stuff with the webpack config...
  devServer : {
    historyApiFallback: true
  }
  return config;
}
