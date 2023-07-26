import { PrismaClient } from '@prisma/client';

describe('PrismaClient', () => {
  let prisma: PrismaClient = new PrismaClient({});
  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });
});
