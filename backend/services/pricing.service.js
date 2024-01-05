const {
  createPricing,
  getPricingByPropertyId,
  updatePricing,
  deletePricing,
} = require('../models/pricing.model');

const createPricingService = async (
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
  const pricing = await createPricing(
    propertyId,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  );
  return pricing;
};

const getPricingByPropertyIdService = async (propertyId) => {
  const pricing = await getPricingByPropertyId(propertyId);
  return pricing;
};

const updatePricingService = async (
  id,
) => {
  const pricing = await updatePricing(
    id,
  );
  return pricing;
};

const deletePricingService = async (
  id,
) => {
  const pricing = await deletePricing(
    id,
  );
  return pricing;
};

module.exports = {
  createPricingService,
  getPricingByPropertyIdService,
  updatePricingService,
  deletePricingService,
};
