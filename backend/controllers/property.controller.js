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
  const property = await createPropertyService(name);
  const pricing = await createPricingService(
    property.id,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  );
  const { id: __, propertyId: _, ...pricingWithoutIdAndPropertyId } = pricing;
  return res.status(201).json({ property, pricingWithoutIdAndPropertyId });
};

const getPropertiesController = async (_req, res) => {
  const properties = await getPropertiesService();
  return res.status(200).json(properties);
};

const getPropertyByIdController = async (req, res) => {
  const { id } = req.params;
  const property = await getPropertyByIdService(id);
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
  const property = await deletePropertyService(id);
  return res.status(200).json(property);
};

module.exports = {
  createPropertyController,
  getPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController,
};