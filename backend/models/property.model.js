const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createProperty = async (name) => {
  const newProperty = await prisma.property.create({
    data: {
      name,
    },
  });
  return newProperty;
};

const getProperties = async () => {
  const properties = await prisma.property.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
    },
  });

  const pricing = await prisma.pricing.findMany({
    select: {
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
    },
  });

  const pricingByPropertyId = pricing.reduce((acc, price) => {
    if (!acc[price.propertyId]) {
      acc[price.propertyId] = [];
    }
    acc[price.propertyId].push(price);
    return acc;
  }, {});

  const placesWithPrices = properties
    .map((property) => ({ ...property, prices: pricingByPropertyId[property.id] || [] }));

  return placesWithPrices;
};

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const pricing = await prisma.pricing.findMany({
    where: {
      propertyId: id,
    },
    select: {
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
    },
  });

  const placesWithPrices = pricing.map((price) => ({ ...property, ...price }));

  return placesWithPrices;
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
  await prisma.property.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  await prisma.pricing.updateMany({
    where: {
      propertyId: id,
    },
    data: {
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

  return { message: 'Property updated successfully' };
};

const deleteProperty = async (id) => {
  await prisma.pricing.deleteMany({
    where: {
      propertyId: id,
    },
  });

  await prisma.property.delete({
    where: {
      id,
    },
  });

  return { message: 'Property deleted successfully' };
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
