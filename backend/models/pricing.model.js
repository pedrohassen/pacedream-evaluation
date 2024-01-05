const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
  const newPricing = await prisma.pricing.create({
    data: {
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
  });
  return newPricing;
};

const getPricingByPropertyId = async (propertyId) => {
  const pricing = await prisma.pricing.findMany({
    where: {
      propertyId,
    },
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
  const pricing = await prisma.pricing.update({
    where: {
      id,
    },
    data: {
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
  });
  return pricing;
};

const deletePricing = async (id) => {
  const pricing = await prisma.pricing.delete({
    where: {
      id,
    },
  });
  return pricing;
};

module.exports = {
  createPricing,
  getPricingByPropertyId,
  updatePricing,
  deletePricing,
};
