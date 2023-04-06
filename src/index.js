const app = require('./app');

const PORT = process.env.PORT || 4001;

app.listen(PORT, (x) => {
  console.log(`server running on port ${PORT}`);
});
