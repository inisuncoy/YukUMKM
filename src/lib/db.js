const { PrismaClient } = require("@prisma/client");

global.prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma.$connect();
}

module.exports = global.prisma;
