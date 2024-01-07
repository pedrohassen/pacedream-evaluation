const dotenv = require('dotenv').config(); // eslint-disable-line
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://mongodb:27017/pacedream', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = server;
