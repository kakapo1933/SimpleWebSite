import express from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiResponse, User } from 'common';

const router = express.Router();
const prisma = new PrismaClient();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const response: ApiResponse<User[]> = {
      status: 'success',
      data: users as User[]
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      status: 'error',
      message: 'Failed to fetch users'
    };
    res.status(500).json(response);
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      const response: ApiResponse = {
        status: 'error',
        message: 'User not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<User> = {
      status: 'success',
      data: user as User
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      status: 'error',
      message: 'Failed to fetch user'
    };
    res.status(500).json(response);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      const response: ApiResponse = {
        status: 'error',
        message: 'Email and name are required'
      };
      return res.status(400).json(response);
    }

    const user = await prisma.user.create({
      data: { email, name }
    });

    const response: ApiResponse<User> = {
      status: 'success',
      data: user as User,
      message: 'User created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiResponse = {
      status: 'error',
      message: 'Failed to create user'
    };
    res.status(500).json(response);
  }
});

export default router;