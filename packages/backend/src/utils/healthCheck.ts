import { PrismaClient } from '@prisma/client';

export async function healthCheck(prisma: PrismaClient): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma is healthy.');
  }
  catch (error) {
    console.error('Prisma health check failed:', error);
    process.exit(1);
  }
}
