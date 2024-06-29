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
      return orderB - orderA;
    });
  if (!files.length) {
    console.info('No seeders found inside ./prisma/seeders');
    process.exit(0);
  }
  console.info('🌳 Undoing seed... 🌳', '\n');
  console.info(`Running the seed undo scripts from the file(s):`);
  for (const file of files) {
    const filePath = joinPath(seedersDir, file);
    const { down }: SeederFileExports = await import(filePath);
    if (!down) {
      continue;
    }
    await down(prisma);
    console.info(file);
  }
  console.info('\n', '🌱 Seed undone succesfully! 🌱');
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
