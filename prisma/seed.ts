import { PrismaClient } from '@prisma/client';
import products from './seeds/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products...');

  // Clear existing products
  await prisma.feedback.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.request.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.product.deleteMany();

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        specs: JSON.stringify(product.specs),
        battery: product.battery,
        performanceLevel: product.performanceLevel,
        weight: product.weight,
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
