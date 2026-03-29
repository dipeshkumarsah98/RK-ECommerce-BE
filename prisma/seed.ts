import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("tarting database seeding...");

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@mailinator.com" },
    update: {},
    create: {
      email: "admin@mailinator.com",
      phone: "+1234567890",
      address: "123 Admin Street, Admin City, AC 12345",
      roles: ["admin"],
    },
  });

  // Create Vendor User
  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@mailinator.com" },
    update: {},
    create: {
      email: "vendor@mailinator.com",
      phone: "+1234567891",
      address: "456 Vendor Avenue, Vendor City, VC 12345",
      roles: ["vendor"],
    },
  });

  // Create Customer User
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@mailinator.com" },
    update: {},
    create: {
      email: "customer@mailinator.com",
      phone: "+1234567892",
      address: "789 Customer Lane, Customer City, CC 12345",
      roles: ["customer"],
    },
  });

  const superUser = await prisma.user.upsert({
    where: { email: "super@mailinator.com" },
    update: {},
    create: {
      email: "super@mailinator.com",
      phone: "+1234567893",
      address: "999 Super Boulevard, Super City, SC 12345",
      roles: ["admin", "vendor"],
    },
  });

  console.log("✅ Seeded users:");
  console.log("👑 Admin user:", {
    id: adminUser.id,
    email: adminUser.email,
    roles: adminUser.roles,
  });
  console.log("🏪 Vendor user:", {
    id: vendorUser.id,
    email: vendorUser.email,
    roles: vendorUser.roles,
  });
  console.log("👤 Customer user:", {
    id: customerUser.id,
    email: customerUser.email,
    roles: customerUser.roles,
  });
  console.log("🚀 Super user:", {
    id: superUser.id,
    email: superUser.email,
    roles: superUser.roles,
  });

  console.log("🎉 Database seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
