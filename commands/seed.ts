import { PrismaClient } from '@prisma/client';
import { readdirSync } from 'fs';
import { join as joinPath } from 'path';
import { SeederFileExports } from './types';

const prisma = new PrismaClient();

async function main() {
  const seedersDir = joinPath(__dirname, '../prisma/seeders');
  const files = readdirSync(seedersDir)
    .filter((file) => file.endsWith('.ts'))
    .sort((a, b) => {
      const orderA = Number(a.split('_')[0]);
      const orderB = Number(b.split('_')[0]);
      return orderA - orderB;
    });
  if (!files.length) {
    console.info('No seeders found inside ./prisma/seeders');
    process.exit(0);
  }
  console.info('🌱 Seeding data... 🌱', '\n');
  console.info(`Running the seed scripts from the file(s):`);
  for (const file of files) {
    const filePath = joinPath(seedersDir, file);
    const { up }: SeederFileExports = await import(filePath);
    if (!up) {
      throw new Error(
        `You have not registered an 'up' script for your seeder at path: ${filePath}`,
      );
    }
    await up(prisma);
    console.info(file);
  }
  console.info('\n', '🌳 Done seeding data! 🌳');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
