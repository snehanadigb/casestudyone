const app = require('./app');
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Document service running on port ${PORT}`);
});
