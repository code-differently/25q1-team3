import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Universities/Organizations
  const walnutYMCA = await prisma.university.create({
    data: {
      name: 'Walnut Street YMCA',
      location: '19801',
    },
  })
  const centralYMCA = await prisma.university.create({
    data: {
      name: 'Central YMCA',
      location: '19801',
    },
  })
  const wyra = await prisma.university.create({
    data: {
      name: 'Wilmington Youth Rowing Association (WYRA)',
      location: '19801',
    },
  })
  const serviam = await prisma.university.create({
    data: {
      name: 'Serviam Girls Academy',
      location: '19801',
    },
  })

  // Programs (with requirements, ages, and types)
  await prisma.program.create({
    data: {
      name: 'Preschool & Childcare',
      description: 'Preschool, school-age childcare, youth development, teen leadership, summer camps, swim lessons, lifeguard training.',
      universityId: walnutYMCA.id,
      requirements: {
        create: [
          { description: 'Ages 2 months - 17 years' },
          { description: 'Registration required' },
        ],
      },
    },
  })
  await prisma.program.create({
    data: {
      name: 'Preschool Programs',
      description: 'Provides preschool programs and childcare services.',
      universityId: centralYMCA.id,
      requirements: {
        create: [
          { description: 'Ages 2 months - 5 years' },
        ],
      },
    },
  })
  await prisma.program.create({
    data: {
      name: 'Inclusive Rowing',
      description: 'Inclusive rowing programs for youth of all abilities and backgrounds.',
      universityId: wyra.id,
      requirements: {
        create: [
          { description: 'Ages 11 - 18 years' },
        ],
      },
    },
  })
  await prisma.program.create({
    data: {
      name: 'Girls Leadership Academy',
      description: 'Tuition-free education for girls in grades 5–8, focusing on academic excellence and leadership.',
      universityId: serviam.id,
      requirements: {
        create: [
          { description: 'Girls, ages 10 - 14 years' },
        ],
      },
    },
  })

  // Users
  const user1 = await prisma.user.upsert({
    where: { email: 'parent@example.com' },
    update: {},
    create: {
      email: 'parent@example.com',
      password: 'hashedpassword',
      name: 'Parent User',
    },
  })
  const user2 = await prisma.user.upsert({
    where: { email: 'youth@example.com' },
    update: {},
    create: {
      email: 'youth@example.com',
      password: 'hashedpassword',
      name: 'Youth User',
    },
  })

  // Bookmarks
  await prisma.bookmark.upsert({
    where: {
      userId_programId: {
        userId: user1.id,
        programId: 1,
      },
    },
    update: {},
    create: {
      userId: user1.id,
      programId: 1,
    },
  })
  await prisma.bookmark.upsert({
    where: {
      userId_programId: {
        userId: user2.id,
        programId: 3,
      },
    },
    update: {},
    create: {
      userId: user2.id,
      programId: 3,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 