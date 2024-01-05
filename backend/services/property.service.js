const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../models/property.model');

const createPropertyService = async (name) => {
  const property = await createProperty(name);
  return property;
};

const getPropertiesService = async () => {
  const properties = await getProperties();
  return properties;
};

const getPropertyByIdService = async (id) => {
  const property = await getPropertyById(id);
  return property;
};

const updatePropertyService = async (
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
) => {
  const property = await updateProperty(
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
  return property;
};

const deletePropertyService = async (id) => {
  const property = await deleteProperty(id);
  return property;
};

module.exports = {
  createPropertyService,
  getPropertiesService,
  getPropertyByIdService,
  updatePropertyService,
  deletePropertyService,
};
