import { Gender, Prisma, PrismaClient } from '@prisma/client';

const USER_DATA: Prisma.UserCreateInput[] = [
  {
    name: 'Leohang Rai',
    email: 'raileohang@gmail.com',
    gender: Gender.MALE,
  },
  {
    name: 'Milon Rai',
    email: 'milon7@gmail.com',
    gender: Gender.MALE,
  },
];

export const up = async (prisma: PrismaClient) => {
  const usersCount = await prisma.user.count();
  if (usersCount) return;
  await prisma.user.createMany({
    data: USER_DATA,
  });
};

export const down = async (prisma: PrismaClient) => {
  const userEmails = USER_DATA.map((user) => user.email);
  await prisma.user.deleteMany({
    where: {
      email: {
        in: userEmails,
      },
    },
  });
};
