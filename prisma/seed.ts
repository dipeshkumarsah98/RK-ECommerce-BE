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

  const adminUser = await prisma.user.upsert({
    where: { email: "adminUser@mailinator.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "adminUser@mailinator.com",
      phone: "+1234567890",
      roles: ["admin"],
      addresses: {
        create: {
          addressType: "shipping",
          street_address: "123 Admin Street",
          city: "Admin City",
          state: "AC",
          postal_code: "12345",
          isDefault: true,
        },
      },
    },
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@mailinator.com" },
    update: {},
    create: {
      name: "Vendor User",
      email: "vendor@mailinator.com",
      phone: "+1234567891",
      addresses: {
        create: {
          addressType: "shipping",
          street_address: "456 Vendor Avenue",
          city: "Vendor City",
          state: "VC",
          postal_code: "12345",
          isDefault: true,
        },
      },
      roles: ["vendor"],
    },
  });

  // Create Customer User
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@mailinator.com" },
    update: {},
    create: {
      name: "Customer User",
      email: "customer@mailinator.com",
      phone: "+1234567892",
      roles: ["customer"],
      addresses: {
        create: {
          addressType: "shipping",
          street_address: "789 Customer Road",
          city: "Customer City",
          state: "CC",
          postal_code: "12345",
          isDefault: true,
        },
      },
    },
  });

  const superUser = await prisma.user.upsert({
    where: { email: "super@mailinator.com" },
    update: {},
    create: {
      name: "Super User",
      email: "super@mailinator.com",
      phone: "+1234567893",
      addresses: {
        create: {
          addressType: "shipping",
          street_address: "999 Super Boulevard",
          city: "Super City",
          state: "SC",
          postal_code: "12345",
          isDefault: true,
        },
      },
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
