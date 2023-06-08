const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const passport = require('passport');
const compression = require('compression');
const appRouter = require('./routes/index');
const notFoundException = require('./middleware/notFoundException');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(passport.initialize());

// enable request.body compression
app.use(compression());
// parse request body to json
app.use(express.json());
// enable cors
app.use(cors());
// secure http headers
app.use(helmet());

// app router
app.use('/api', appRouter);

// added error exception handler
app.use(notFoundException);
app.use(errorHandler);

module.exports = app;
