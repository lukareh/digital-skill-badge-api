const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`digital skill badge api is running on port ${PORT}`);
  console.log(`health check: http://localhost:${PORT}/health`);
});
