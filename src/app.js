const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');

const app = express();

// parse request body to json
app.use(express.json());
// enable cors
app.use(cors());
// secure http headers
app.use(helmet());

module.exports = app;
