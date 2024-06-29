import { Post, Prisma, PrismaClient } from '@prisma/client';

const POSTS_DATA: Prisma.PostCreateInput[] = [
  {
    uuid: 'cdb7e023-dd7a-4018-be34-02dc2090c6f7',
    title: 'Post 1',
    content: 'This is the first post from Leohang Rai.',
    author: {
      connect: {
        email: 'raileohang@gmail.com',
      },
    },
  },
  {
    uuid: 'a8c56e50-20bd-4295-b721-5d65aeb72fd4',
    title: 'Post 2',
    content: 'This is the first post from Milon rai.',
    author: {
      connect: {
        email: 'milon7@gmail.com',
      },
    },
  },
];
export const up = async (prisma: PrismaClient) => {
  const postsCount = await prisma.post.count();
  if (postsCount) return;
  /* 
    the reason why I'm using a Promise.all() call here with multiple "post.create()" promises, 
    instead of using the "post.createMany()" method is because 
    the "post.createMany()" method does not support relation 'connect' payload.
  */
  const postCreatePromises: Promise<Post>[] = [];
  for (const post of POSTS_DATA) {
    postCreatePromises.push(
      prisma.post.create({
        data: post,
      }),
    );
  }
  await Promise.all(postCreatePromises);
};

export const down = async (prisma: PrismaClient) => {
  const postUuids = POSTS_DATA.map((post) => post.uuid as string);
  await prisma.post.deleteMany({
    where: {
      uuid: {
        in: postUuids,
      },
    },
  });
};
