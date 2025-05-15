import { Router } from 'express';
import { beverageController } from '../controllers/beverageController';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

// Get all beverage categories
router.get('/categories', catchAsync(beverageController.getBeverageCategories));

// Get a specific beverage category by ID
router.get('/categories/:id', catchAsync(beverageController.getBeverageCategoryById));

// Get all beverages
router.get('/', catchAsync(beverageController.getBeverages));

// Get a specific beverage by ID
router.get('/:id', catchAsync(beverageController.getBeverageById));

export default router;
