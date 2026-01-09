const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// test database connection before starting server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`digital skill badge api is running on port ${PORT}`);
    console.log(`health check: http://localhost:${PORT}/health`);
  });
}).catch((error) => {
  console.error('failed to start server:', error.message);
  process.exit(1);
});
