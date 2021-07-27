// File change detection imporove
module.exports = {
  webPackDevMiddleware: config =>{
    config.watchOptions.poll = 300;
    return config;
  }
};