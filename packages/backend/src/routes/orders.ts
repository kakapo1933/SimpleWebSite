import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      items,
      paymentMethod,
      groupOrderId,
    } = req.body;
    
    // Validate required fields
    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required',
      });
    }
    
    // Calculate total amount
    let totalAmount = 0;
    
    // Validate items and calculate total
    for (const item of items) {
      if (!item.beverageId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Each order item must have a beverage ID and quantity',
        });
      }
      
      // Get beverage price
      const beverage = await prisma.beverage.findUnique({
        where: { id: Number(item.beverageId) },
      });
      
      if (!beverage) {
        return res.status(404).json({
          success: false,
          message: `Beverage with ID ${item.beverageId} not found`,
        });
      }
      
      // Add base price * quantity
      totalAmount += Number(beverage.price) * item.quantity;
      
      // Add customization costs if any
      if (item.customizations) {
        // This assumes customizations is an array of {id, option} objects
        // and that the option has a price property
        for (const customization of item.customizations) {
          if (customization.option && customization.option.price) {
            totalAmount += Number(customization.option.price) * item.quantity;
          }
        }
      }
    }
    
    // Create the order
    const order = await prisma.order.create({
      data: {
        customerName: customerName || undefined,
        customerEmail: customerEmail || undefined,
        customerPhone: customerPhone || undefined,
        totalAmount,
        paymentMethod: paymentMethod || undefined,
        groupOrderId: groupOrderId ? Number(groupOrderId) : undefined,
        items: {
          create: items.map((item) => ({
            beverageId: Number(item.beverageId),
            quantity: Number(item.quantity),
            price: Number(item.price),
            customizations: item.customizations || undefined,
            notes: item.notes || undefined,
          })),
        },
      },
      include: {
        items: {
          include: {
            beverage: true,
          },
        },
        groupOrder: true,
      },
    });
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            beverage: true,
          },
        },
        groupOrder: true,
      },
    });
    
    res.json({
      success: true,
      data: orders,
      message: 'Orders retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders',
    });
  }
});

// Get a specific order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        items: {
          include: {
            beverage: true,
          },
        },
        groupOrder: true,
      },
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    
    res.json({
      success: true,
      data: order,
      message: 'Order retrieved successfully',
    });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order',
    });
  }
});

// Update order status
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
    
    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
    
    res.json({
      success: true,
      data: updatedOrder,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
    });
  }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentMethod } = req.body;
    
    // Validate payment status
    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        message: 'Payment status is required',
      });
    }
    
    // Update payment status
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        paymentStatus,
        paymentMethod: paymentMethod || undefined,
        updatedAt: new Date(),
      },
    });
    
    res.json({
      success: true,
      data: updatedOrder,
      message: 'Payment status updated successfully',
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
    });
  }
});

export default router;
