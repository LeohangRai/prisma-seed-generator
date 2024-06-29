import * as readline from 'node:readline'; // because no default import :(
import { join as joinPath } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { getCurrentTimestamp, sanitizeFileName } from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter the name of the seeder file (without extension): ',
  (seederFileName) => {
    const fileName = sanitizeFileName(seederFileName || '');
    rl.close();
    const fileNameWithTimestampPrefix = `${getCurrentTimestamp()}_${fileName}`;
    const seedersDirPath = joinPath(__dirname, '../prisma/seeders');
    if (!existsSync(seedersDirPath)) {
      mkdirSync(seedersDirPath, {
        recursive: true,
      });
    }
    const newSeederFilePath = joinPath(
      __dirname,
      '../prisma/seeders',
      `${fileNameWithTimestampPrefix}.ts`,
    );
    const seederBoilerPlate = readFileSync(
      joinPath(__dirname, 'templates/seeder.template.ts'),
      'utf8',
    );
    writeFileSync(newSeederFilePath, seederBoilerPlate, 'utf-8');
    console.log('Seeder created at path:', newSeederFilePath);
  },
);
