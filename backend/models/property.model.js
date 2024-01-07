/* eslint-disable no-underscore-dangle */
const { Property, Pricing } = require('../database/schema');

const createProperty = async (name) => {
  const newProperty = await Property.create({
    name,
  });
  return newProperty;
};

const getProperties = async () => {
  const properties = await Property.find().sort({ name: 'asc' });

  const pricing = await Pricing.find().select({
    id: true,
    propertyId: true,
    method: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const placesWithPrices = properties.map((property) => ({
    ...property._doc,
    pricing: pricing
      .filter((price) => price.propertyId.toString() === property._id.toString())
      .map((price) => {
        const { _id, propertyId, ...rest } = price._doc;
        return rest;
      }),
  }));

  return placesWithPrices;
};

const getPropertyById = async (id) => {
  if (!id) {
    return {};
  }

  const property = await Property.findById(id);

  if (!property) {
    return null;
  }

  const pricing = await Pricing.findOne({ propertyId: id }).select({
    method: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  return {
    ...property._doc,
    pricing: pricing ? { ...pricing._doc } : null,
  };
};

const updateProperty = async (
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
  await Property.findByIdAndUpdate(id, { name });

  await Pricing.updateMany(
    { propertyId: id },
    {
      method,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    },
  );

  return { message: 'Property updated successfully' };
};

const deleteProperty = async (id) => {
  await Pricing.deleteMany({ propertyId: id });
  await Property.findByIdAndDelete(id);

  return { message: 'Property deleted successfully' };
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
