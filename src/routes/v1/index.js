const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const bookRoute = require('./book.route');
const swagger = require('../../config/swagger');

const router = express.Router();

// configure swagger-ui
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJsDoc(swagger.options)));
// api routes
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/book', bookRoute);

module.exports = router;
