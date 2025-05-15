import { prisma } from '../models/PrismaClient';
import type { Beverage, BeverageCategory } from '@prisma/client';
import { BeverageFilter } from '../types';

/**
 * Retrieves all beverage categories from the database.
 * 
 * @returns {Promise<Array<BeverageCategory & { beverages: Beverage[] }>>} A promise that resolves to an array of beverage categories with their associated beverages.
 */
const getBeverageCategories = async (): Promise<Array<BeverageCategory & { beverages: Beverage[] }>> => {
  return await prisma.BeverageCategory.findMany({
    include: {
      beverages: true,
    },
  });
};

/**
 * Retrieves a specific beverage category by ID.
 * 
 * @param {number} id - The ID of the beverage category to retrieve.
 * @returns {Promise<(BeverageCategory & { beverages: Beverage[] }) | null>} A promise that resolves to the beverage category with its associated beverages, or null if not found.
 */
const getBeverageCategoryById = async (id: number): Promise<(BeverageCategory & { beverages: Beverage[] }) | null> => {
  return await prisma.BeverageCategory.findUnique({
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
 * @returns {Promise<Array<Beverage & { category: BeverageCategory, customizations: any[] }>>} A promise that resolves to an array of beverages with their associated category and customizations.
 */
const getBeverages = async (filter: BeverageFilter): Promise<Array<Beverage & { category: BeverageCategory, customizations: any[] }>> => {
  return await prisma.Beverage.findMany({
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
 * @returns {Promise<(Beverage & { category: BeverageCategory, customizations: any[] }) | null>} A promise that resolves to the beverage with its associated category and customizations, or null if not found.
 */
const getBeverageById = async (id: number): Promise<(Beverage & { category: BeverageCategory, customizations: any[] }) | null> => {
  return await prisma.Beverage.findUnique({
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
