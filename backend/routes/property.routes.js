const { Router } = require('express');
const {
  createPropertyController,
  getPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController,
} = require('../controllers/property.controller');
const { validateCreation, validateGetById } = require('../middlewares/property.middlewares');

const propertyRouter = Router();

propertyRouter.post('/', validateCreation, createPropertyController);
propertyRouter.get('/', getPropertiesController);
propertyRouter.get('/:id', validateGetById, getPropertyByIdController);
propertyRouter.put('/:id', validateGetById, updatePropertyController);
propertyRouter.delete('/:id', validateGetById, deletePropertyController);

module.exports = propertyRouter;
