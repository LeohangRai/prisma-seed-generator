import { PrismaClient } from '@prisma/client';

export type SeederUpFunction = (prisma: PrismaClient) => any;
export type SeederDownFunction = SeederUpFunction;

export interface SeederFileExports {
  up: SeederUpFunction;
  down: SeederDownFunction;
}
