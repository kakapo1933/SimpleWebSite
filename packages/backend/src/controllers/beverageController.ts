import { Request, Response } from 'express';
import { BeverageService } from '../services';
import { ResponseHandler } from '../utils/responseHandler';
import { GetBeveragesQuery, GetBeverageByIdParams, GetBeverageCategoryByIdParams } from '../types';

/**
 * Fetches all beverage categories.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object used to send the beverage categories data.
 */
async function getBeverageCategories(
  req: Request,
  res: Response,
): Promise<void> {
  const categories = await BeverageService.getBeverageCategories();
  ResponseHandler.success(res, categories, 'Beverage categories retrieved successfully');
}

/**
 * Fetches a specific beverage category by ID.
 * 
 * @param {Request} req - The HTTP request object containing the category ID parameter.
 * @param {Response} res - The HTTP response object used to send the beverage category data.
 */
async function getBeverageCategoryById(
  req: Request<GetBeverageCategoryByIdParams>,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const category = await BeverageService.getBeverageCategoryById(Number(id));
  
  if (!category) {
    ResponseHandler.error(res, 'Beverage category not found', 404);
    return;
  }
  
  ResponseHandler.success(res, category, 'Beverage category retrieved successfully');
}

/**
 * Fetches beverages based on the provided query parameters.
 * 
 * @param {Request} req - The HTTP request object containing query parameters.
 * @param {Response} res - The HTTP response object used to send the beverages data.
 */
async function getBeverages(
  req: Request<object, object, object, GetBeveragesQuery>,
  res: Response,
): Promise<void> {
  const { popular, new: isNew, categoryId } = req.query;
  const beverages = await BeverageService.getBeverages(popular, isNew, categoryId);
  ResponseHandler.success(res, beverages, 'Beverages retrieved successfully');
}

/**
 * Fetches a specific beverage by ID.
 * 
 * @param {Request} req - The HTTP request object containing the beverage ID parameter.
 * @param {Response} res - The HTTP response object used to send the beverage data.
 */
async function getBeverageById(
  req: Request<GetBeverageByIdParams>,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const beverage = await BeverageService.getBeverageById(Number(id));
  
  if (!beverage) {
    ResponseHandler.error(res, 'Beverage not found', 404);
    return;
  }
  
  ResponseHandler.success(res, beverage, 'Beverage retrieved successfully');
}

export const beverageController = {
  getBeverageCategories,
  getBeverageCategoryById,
  getBeverages,
  getBeverageById,
};
