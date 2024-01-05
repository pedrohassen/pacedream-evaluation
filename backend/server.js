const dotenv = require('dotenv').config(); // eslint-disable-line
const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = server;
