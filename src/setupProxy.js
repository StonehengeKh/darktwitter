const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use( "/auth", proxy({
    target: 'http://hipstagram.asmer.fs.a-level.com.ua/graphql',
    changeOrigin: true,
  }));
};