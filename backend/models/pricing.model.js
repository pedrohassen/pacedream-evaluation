const { Pricing } = require('../database/schema');

const createPricing = async (
  propertyId,
  method,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
) => {
  const newPricing = await Pricing.create({
    propertyId,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  });
  return newPricing;
};

const getPricingByPropertyId = async (propertyId) => {
  const pricing = await Pricing.find({
    propertyId,
  });
  return pricing;
};

const updatePricing = async (
  id,
  propertyId,
  method,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
) => {
  const pricing = await Pricing.findByIdAndUpdate(
    id,
    {
      propertyId,
      method,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    },
    { new: true },
  );
  return pricing;
};

const deletePricing = async (id) => {
  const pricing = await Pricing.findOneAndDelete({
    _id: id,
  });
  return pricing;
};

module.exports = {
  createPricing,
  getPricingByPropertyId,
  updatePricing,
  deletePricing,
};
