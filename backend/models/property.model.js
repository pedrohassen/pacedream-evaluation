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

  const placesWithPrices = properties.map((property) => ({
    ...property,
    pricing: pricing
      .filter((price) => price.propertyId === property.id)
      .map((price) => {
        const { id: _, propertyId: __, ...rest } = price;
        return rest;
      }),
  }));

  return placesWithPrices;
};

const getPropertyById = async (id) => {
  if (!id) {
    return {};
  }
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    return null;
  }

  const pricing = await prisma.pricing.findUnique({
    where: {
      propertyId: id,
    },
    select: {
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

  return {
    ...property,
    pricing,
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
  await prisma.pricing.delete({
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
