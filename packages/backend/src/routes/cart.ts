import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get cart items for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const cartItems = await prisma.cartItem.findMany({
      where: {
        sessionId,
      },
    });
    
    // Get beverage details for each cart item
    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const beverage = await prisma.beverage.findUnique({
          where: { id: item.beverageId },
          include: {
            category: true,
            customizations: true,
          },
        });
        
        return {
          ...item,
          beverage,
        };
      }),
    );
    
    res.json({
      success: true,
      data: itemsWithDetails,
      message: 'Cart items retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart items',
    });
  }
});

// Add item to cart
router.post('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { beverageId, quantity, customizations, notes } = req.body;
    
    // Validate required fields
    if (!beverageId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Beverage ID and quantity are required',
      });
    }
    
    // Check if beverage exists
    const beverage = await prisma.beverage.findUnique({
      where: { id: Number(beverageId) },
    });
    
    if (!beverage) {
      return res.status(404).json({
        success: false,
        message: 'Beverage not found',
      });
    }
    
    // Create cart item
    const cartItem = await prisma.cartItem.create({
      data: {
        sessionId,
        beverageId: Number(beverageId),
        quantity: Number(quantity),
        customizations: customizations || undefined,
        notes: notes || undefined,
      },
    });
    
    res.status(201).json({
      success: true,
      data: cartItem,
      message: 'Item added to cart successfully',
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
    });
  }
});

// Update cart item
router.put('/:sessionId/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity, customizations, notes } = req.body;
    
    // Validate required fields
    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required',
      });
    }
    
    // Update cart item
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity: Number(quantity),
        customizations: customizations || undefined,
        notes: notes || undefined,
        updatedAt: new Date(),
      },
    });
    
    res.json({
      success: true,
      data: updatedItem,
      message: 'Cart item updated successfully',
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
    });
  }
});

// Remove item from cart
router.delete('/:sessionId/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    
    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: itemId },
    });
    
    res.json({
      success: true,
      message: 'Item removed from cart successfully',
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
    });
  }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    // Delete all cart items for the session
    await prisma.cartItem.deleteMany({
      where: { sessionId },
    });
    
    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
    });
  }
});

export default router;
