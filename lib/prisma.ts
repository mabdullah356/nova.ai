import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as {
    prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
});