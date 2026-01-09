const express = require('express');
const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const badgeRoutes = require('./routes/badge.routes');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request/response logger middleware
app.use((req, res, next) => {
  console.log('\nincoming request:');
  console.log('method:', req.method);
  console.log('url:', req.originalUrl);
  console.log('path:', req.path);
  
  if (Object.keys(req.query).length > 0) {
    console.log('query params:', JSON.stringify(req.query));
  }
  
  if (Object.keys(req.params).length > 0) {
    console.log('route params:', JSON.stringify(req.params));
  }
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('request body:', JSON.stringify(req.body));
  }
  
  // capture the original res.json to log status code
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    console.log('response status:', res.statusCode);
    console.log('response body:', JSON.stringify(data));    return originalJson(data);
  };
  
  next();
});

// routes
app.use('/health', healthRoutes);
app.use('/users', userRoutes);
app.use('/badges', badgeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'route not found' });
});

module.exports = app;
