import express from 'express';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

const router = express.Router();
const prisma = new PrismaClient();

// Generate a unique share code
const generateShareCode = (): string => {
  return randomBytes(8).toString('hex').substring(0, 8).toUpperCase();
};

// Create a new group order
router.post('/', async (req, res) => {
  try {
    const { name, creatorName, expiresInMinutes = 60 } = req.body;
    
    // Validate required fields
    if (!name || !creatorName) {
      return res.status(400).json({
        success: false,
        message: 'Name and creator name are required',
      });
    }
    
    // Generate a unique share code
    let shareCode = generateShareCode();
    let codeExists = true;
    
    // Ensure the share code is unique
    while (codeExists) {
      const existingOrder = await prisma.groupOrder.findUnique({
        where: { shareCode },
      });
      
      if (!existingOrder) {
        codeExists = false;
      } else {
        shareCode = generateShareCode();
      }
    }
    
    // Calculate expiration time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + Number(expiresInMinutes));
    
    // Create the group order
    const groupOrder = await prisma.groupOrder.create({
      data: {
        name,
        shareCode,
        creatorName,
        expiresAt,
      },
    });
    
    res.status(201).json({
      success: true,
      data: groupOrder,
      message: 'Group order created successfully',
    });
  } catch (error) {
    console.error('Error creating group order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create group order',
    });
  }
});

// Get a group order by share code
router.get('/code/:shareCode', async (req, res) => {
  try {
    const { shareCode } = req.params;
    
    const groupOrder = await prisma.groupOrder.findUnique({
      where: { shareCode },
      include: {
        orders: {
          include: {
            items: {
              include: {
                beverage: true,
              },
            },
          },
        },
      },
    });
    
    if (!groupOrder) {
      return res.status(404).json({
        success: false,
        message: 'Group order not found',
      });
    }
    
    // Check if the group order has expired
    if (new Date() > groupOrder.expiresAt && groupOrder.status === 'active') {
      // Update the status to expired
      await prisma.groupOrder.update({
        where: { id: groupOrder.id },
        data: { status: 'expired' },
      });
      
      groupOrder.status = 'expired';
    }
    
    res.json({
      success: true,
      data: groupOrder,
      message: 'Group order retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving group order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve group order',
    });
  }
});

// Get a group order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const groupOrder = await prisma.groupOrder.findUnique({
      where: { id: Number(id) },
      include: {
        orders: {
          include: {
            items: {
              include: {
                beverage: true,
              },
            },
          },
        },
      },
    });
    
    if (!groupOrder) {
      return res.status(404).json({
        success: false,
        message: 'Group order not found',
      });
    }
    
    // Check if the group order has expired
    if (new Date() > groupOrder.expiresAt && groupOrder.status === 'active') {
      // Update the status to expired
      await prisma.groupOrder.update({
        where: { id: groupOrder.id },
        data: { status: 'expired' },
      });
      
      groupOrder.status = 'expired';
    }
    
    res.json({
      success: true,
      data: groupOrder,
      message: 'Group order retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving group order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve group order',
    });
  }
});

// Update group order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }
    
    // Update group order status
    const updatedGroupOrder = await prisma.groupOrder.update({
      where: { id: Number(id) },
      data: { status },
    });
    
    res.json({
      success: true,
      data: updatedGroupOrder,
      message: 'Group order status updated successfully',
    });
  } catch (error) {
    console.error('Error updating group order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update group order status',
    });
  }
});

// Extend group order expiration time
router.patch('/:id/extend', async (req, res) => {
  try {
    const { id } = req.params;
    const { additionalMinutes = 30 } = req.body;
    
    // Get the current group order
    const groupOrder = await prisma.groupOrder.findUnique({
      where: { id: Number(id) },
    });
    
    if (!groupOrder) {
      return res.status(404).json({
        success: false,
        message: 'Group order not found',
      });
    }
    
    // Calculate new expiration time
    const newExpiresAt = new Date(groupOrder.expiresAt);
    newExpiresAt.setMinutes(newExpiresAt.getMinutes() + Number(additionalMinutes));
    
    // Update expiration time
    const updatedGroupOrder = await prisma.groupOrder.update({
      where: { id: Number(id) },
      data: {
        expiresAt: newExpiresAt,
        status: 'active', // Reactivate if it was expired
      },
    });
    
    res.json({
      success: true,
      data: updatedGroupOrder,
      message: 'Group order expiration time extended successfully',
    });
  } catch (error) {
    console.error('Error extending group order expiration time:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to extend group order expiration time',
    });
  }
});

export default router;