const { Router } = require('express');
const {
  createPropertyController,
  getPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController,
} = require('../controllers/property.controller');

const propertyRouter = Router();

propertyRouter.post('/', createPropertyController);
propertyRouter.get('/', getPropertiesController);
propertyRouter.get('/:id', getPropertyByIdController);
propertyRouter.put('/:id', updatePropertyController);
propertyRouter.delete('/:id', deletePropertyController);

module.exports = propertyRouter;
