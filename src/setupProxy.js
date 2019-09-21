const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use( "/api", proxy({
    target: 'http://hipstagram.asmer.fs.a-level.com.ua',
    changeOrigin: true,
  }));
};