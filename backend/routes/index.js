const { Router } = require('express');
const propertyRouter = require('./property.routes');

const router = Router();

router.use('/property/', propertyRouter);

module.exports = router;
