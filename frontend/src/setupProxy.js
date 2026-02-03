const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Handle /api routes
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  
  // Handle /task routes
  app.use(
    '/task',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
