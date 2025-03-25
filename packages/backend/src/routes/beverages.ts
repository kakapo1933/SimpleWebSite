import express from 'express';
import { PrismaClient } from '@prisma/client';

// Define type for beverage query filter
interface BeverageFilter {
  isPopular?: boolean;
  isNew?: boolean;
  categoryId?: number;
}

const router = express.Router();
const prisma = new PrismaClient();

// Get all beverage categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.beverageCategory.findMany({
      include: {
        beverages: true,
      },
    });
    res.json({
      success: true,
      data: categories,
      message: 'Beverage categories retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving beverage categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve beverage categories',
    });
  }
});

// Get a specific beverage category by ID
router.get('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.beverageCategory.findUnique({
      where: { id: Number(id) },
      include: {
        beverages: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Beverage category not found',
      });
    }

    res.json({
      success: true,
      data: category,
      message: 'Beverage category retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving beverage category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve beverage category',
    });
  }
});

// Get all beverages
router.get('/', async (req, res) => {
  try {
    const { popular, new: isNew, categoryId } = req.query;

    const whereClause: BeverageFilter = {};

    if (popular === 'true') {
      whereClause.isPopular = true;
    }

    if (isNew === 'true') {
      whereClause.isNew = true;
    }

    if (categoryId) {
      whereClause.categoryId = Number(categoryId);
    }

    const beverages = await prisma.beverage.findMany({
      where: whereClause,
      include: {
        category: true,
        customizations: true,
      },
    });

    res.json({
      success: true,
      data: beverages,
      message: 'Beverages retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving beverages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve beverages',
    });
  }
});

// Get a specific beverage by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const beverage = await prisma.beverage.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        customizations: true,
      },
    });

    if (!beverage) {
      return res.status(404).json({
        success: false,
        message: 'Beverage not found',
      });
    }

    res.json({
      success: true,
      data: beverage,
      message: 'Beverage retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving beverage:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve beverage',
    });
  }
});

export default router;