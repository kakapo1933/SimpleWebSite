import { BeverageRepository } from '../repositories/beverageRepository';
import type { beverage, beverage_category } from '@prisma/client';
import { BeverageFilter } from '../types';

/**
 * Retrieves all beverage categories from the database.
 * 
 * @returns {Promise<Array<beverage_category & { beverages: beverage[] }>>} A promise that resolves to an array of beverage categories with their associated beverages.
 */
async function getBeverageCategories(): Promise<Array<beverage_category & { beverages: beverage[] }>> {
  return await BeverageRepository.getBeverageCategories();
}

/**
 * Retrieves a specific beverage category by ID.
 * 
 * @param {number} id - The ID of the beverage category to retrieve.
 * @returns {Promise<(beverage_category & { beverages: beverage[] }) | null>} A promise that resolves to the beverage category with its associated beverages, or null if not found.
 */
async function getBeverageCategoryById(id: number): Promise<(beverage_category & { beverages: beverage[] }) | null> {
  return await BeverageRepository.getBeverageCategoryById(id);
}

/**
 * Retrieves beverages from the database based on the provided filter parameters.
 * 
 * @param {string | undefined} popular - If 'true', only popular beverages will be returned.
 * @param {string | undefined} isNew - If 'true', only new beverages will be returned.
 * @param {string | undefined} categoryId - If provided, only beverages in the specified category will be returned.
 * @returns {Promise<Array<beverage & { category: beverage_category, customizations: any[] }>>} A promise that resolves to an array of beverages with their associated category and customizations.
 */
async function getBeverages(
  popular?: string,
  isNew?: string,
  categoryId?: string,
): Promise<Array<beverage & { category: beverage_category, customizations: any[] }>> {
  const filter: BeverageFilter = {};

  if (popular === 'true') {
    filter.isPopular = true;
  }

  if (isNew === 'true') {
    filter.isNew = true;
  }

  if (categoryId) {
    filter.categoryId = Number(categoryId);
  }

  return await BeverageRepository.getBeverages(filter);
}

/**
 * Retrieves a specific beverage by ID.
 * 
 * @param {number} id - The ID of the beverage to retrieve.
 * @returns {Promise<(beverage & { category: beverage_category, customizations: any[] }) | null>} A promise that resolves to the beverage with its associated category and customizations, or null if not found.
 */
async function getBeverageById(id: number): Promise<(beverage & { category: beverage_category, customizations: any[] }) | null> {
  return await BeverageRepository.getBeverageById(id);
}

export const BeverageService = {
  getBeverageCategories,
  getBeverageCategoryById,
  getBeverages,
  getBeverageById,
};
