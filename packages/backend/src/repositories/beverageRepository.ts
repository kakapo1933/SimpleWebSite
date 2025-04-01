import { prisma } from '../models/PrismaClient';
import type { beverage, beverage_category } from '@prisma/client';
import { BeverageFilter } from '../types';

/**
 * Retrieves all beverage categories from the database.
 * 
 * @returns {Promise<Array<beverage_category & { beverages: beverage[] }>>} A promise that resolves to an array of beverage categories with their associated beverages.
 */
const getBeverageCategories = async (): Promise<Array<beverage_category & { beverages: beverage[] }>> => {
  return await prisma.beverage_category.findMany({
    include: {
      beverages: true,
    },
  });
};

/**
 * Retrieves a specific beverage category by ID.
 * 
 * @param {number} id - The ID of the beverage category to retrieve.
 * @returns {Promise<(beverage_category & { beverages: beverage[] }) | null>} A promise that resolves to the beverage category with its associated beverages, or null if not found.
 */
const getBeverageCategoryById = async (id: number): Promise<(beverage_category & { beverages: beverage[] }) | null> => {
  return await prisma.beverage_category.findUnique({
    where: { id },
    include: {
      beverages: true,
    },
  });
};

/**
 * Retrieves beverages from the database based on the provided filter.
 * 
 * @param {BeverageFilter} filter - The filter to apply to the query.
 * @returns {Promise<Array<beverage & { category: beverage_category, customizations: any[] }>>} A promise that resolves to an array of beverages with their associated category and customizations.
 */
const getBeverages = async (filter: BeverageFilter): Promise<Array<beverage & { category: beverage_category, customizations: any[] }>> => {
  return await prisma.beverage.findMany({
    where: filter,
    include: {
      category: true,
      customizations: true,
    },
  });
};

/**
 * Retrieves a specific beverage by ID.
 * 
 * @param {number} id - The ID of the beverage to retrieve.
 * @returns {Promise<(beverage & { category: beverage_category, customizations: any[] }) | null>} A promise that resolves to the beverage with its associated category and customizations, or null if not found.
 */
const getBeverageById = async (id: number): Promise<(beverage & { category: beverage_category, customizations: any[] }) | null> => {
  return await prisma.beverage.findUnique({
    where: { id },
    include: {
      category: true,
      customizations: true,
    },
  });
};

export const BeverageRepository = {
  getBeverageCategories,
  getBeverageCategoryById,
  getBeverages,
  getBeverageById,
};