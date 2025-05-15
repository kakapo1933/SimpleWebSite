// Singleton all PrismaClient instance should use, don't create new instance
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
