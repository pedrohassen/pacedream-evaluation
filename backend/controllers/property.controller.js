const {
  createPropertyService,
  getPropertiesService,
  getPropertyByIdService,
  updatePropertyService,
  deletePropertyService,
} = require('../services/property.service');

const { createPricingService } = require('../services/pricing.service');

const createPropertyController = async (req, res) => {
  const {
    name,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  const properties = await createPropertyService(name);

  const pricing = await createPricingService(
    properties.id,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  );

  const { _id, propertyId, ...cleanPricing } = pricing.toObject();

  return res.status(201).json({
    properties: {
      id: properties.id,
      name: properties.name,
    },
    cleanPricing,
  });
};

const getPropertiesController = async (_req, res) => {
  const propertiesWithPricing = await getPropertiesService();
  return res.status(200).json(propertiesWithPricing);
};

const getPropertyByIdController = async (req, res) => {
  const { id } = req.params;
  const property = await getPropertyByIdService(id);
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }
  return res.status(200).json(property);
};

const updatePropertyController = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;
  const property = await updatePropertyService(
    id,
    name,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  );
  return res.status(200).json(property);
};

const deletePropertyController = async (req, res) => {
  const { id } = req.params;
  const property = await getPropertyByIdService(id);
  if (!property) {
    return res.status(404).json({ message: 'Property not found' });
  }
  const deleteResponse = await deletePropertyService(id);
  return res.status(200).json(deleteResponse);
};

module.exports = {
  createPropertyController,
  getPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController,
};
