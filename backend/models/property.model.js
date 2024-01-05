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
      pricing: {
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
      },
    },
  });
  return properties;
};

const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      pricing: {
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
      },
    },
  });
  return property;
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
  await prisma.pricing.update({
    where: {
      propertyId: id,
    },
    data: {
      propertyId: id,
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
  await prisma.property.delete({
    where: {
      id,
    },
  });
  await prisma.pricing.delete({
    where: {
      propertyId: id,
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
