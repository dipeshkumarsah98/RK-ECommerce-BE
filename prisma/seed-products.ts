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
  console.log("Starting product seeding...");

  const product1 = await prisma.product.upsert({
    where: { slug: "wireless-bluetooth-headphones" },
    update: {},
    create: {
      slug: "wireless-bluetooth-headphones",
      title: "Premium Wireless Bluetooth Headphones",
      description:
        "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
      price: 8999,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      ],
      totalStock: 50,
      status: "active",
      movements: {
        create: {
          quantity: 50,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product2 = await prisma.product.upsert({
    where: { slug: "smart-fitness-tracker" },
    update: {},
    create: {
      slug: "smart-fitness-tracker",
      title: "Smart Fitness Tracker Watch",
      description:
        "Track your health and fitness goals with heart rate monitoring, sleep tracking, and 7-day battery life.",
      price: 4999,
      images: [
        "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8",
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
      ],
      totalStock: 75,
      status: "active",
      movements: {
        create: {
          quantity: 75,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product3 = await prisma.product.upsert({
    where: { slug: "portable-power-bank-20000mah" },
    update: {},
    create: {
      slug: "portable-power-bank-20000mah",
      title: "20000mAh Portable Power Bank",
      description:
        "High-capacity power bank with fast charging, dual USB ports, and LED battery indicator.",
      price: 2499,
      images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5"],
      totalStock: 100,
      status: "active",
      movements: {
        create: {
          quantity: 100,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product4 = await prisma.product.upsert({
    where: { slug: "mechanical-gaming-keyboard" },
    update: {},
    create: {
      slug: "mechanical-gaming-keyboard",
      title: "RGB Mechanical Gaming Keyboard",
      description:
        "Professional gaming keyboard with Cherry MX switches, customizable RGB lighting, and programmable keys.",
      price: 12999,
      images: [
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
      ],
      totalStock: 30,
      status: "active",
      movements: {
        create: {
          quantity: 30,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product5 = await prisma.product.upsert({
    where: { slug: "wireless-gaming-mouse" },
    update: {},
    create: {
      slug: "wireless-gaming-mouse",
      title: "Wireless Gaming Mouse Pro",
      description:
        "High-precision wireless gaming mouse with 16000 DPI, customizable buttons, and 70-hour battery life.",
      price: 6999,
      images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46"],
      totalStock: 45,
      status: "active",
      movements: {
        create: {
          quantity: 45,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product6 = await prisma.product.upsert({
    where: { slug: "usb-c-charging-cable-pack" },
    update: {},
    create: {
      slug: "usb-c-charging-cable-pack",
      title: "USB-C Fast Charging Cable (3-Pack)",
      description:
        "Durable braided USB-C cables with fast charging support, available in 1m, 2m, and 3m lengths.",
      price: 1499,
      images: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0"],
      totalStock: 150,
      status: "active",
      movements: {
        create: {
          quantity: 150,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product7 = await prisma.product.upsert({
    where: { slug: "4k-webcam-streaming" },
    update: {},
    create: {
      slug: "4k-webcam-streaming",
      title: "4K Pro Webcam for Streaming",
      description:
        "Professional 4K webcam with autofocus, dual microphones, and adjustable field of view for streaming and video calls.",
      price: 15999,
      images: ["https://images.unsplash.com/photo-1593642532400-2682810df593"],
      totalStock: 25,
      status: "active",
      movements: {
        create: {
          quantity: 25,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product8 = await prisma.product.upsert({
    where: { slug: "laptop-cooling-pad" },
    update: {},
    create: {
      slug: "laptop-cooling-pad",
      title: "Laptop Cooling Pad with LED Fans",
      description:
        "Dual-fan cooling pad for laptops up to 17 inches, with adjustable height and USB-powered LED fans.",
      price: 1999,
      images: ["https://images.unsplash.com/photo-1625948515291-69613efd103f"],
      totalStock: 60,
      status: "active",
      movements: {
        create: {
          quantity: 60,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product9 = await prisma.product.upsert({
    where: { slug: "wireless-earbuds-pro" },
    update: {},
    create: {
      slug: "wireless-earbuds-pro",
      title: "Wireless Earbuds Pro with ANC",
      description:
        "True wireless earbuds with active noise cancellation, transparency mode, and wireless charging case.",
      price: 11999,
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7",
      ],
      totalStock: 40,
      status: "active",
      movements: {
        create: {
          quantity: 40,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  const product10 = await prisma.product.upsert({
    where: { slug: "portable-ssd-1tb" },
    update: {},
    create: {
      slug: "portable-ssd-1tb",
      title: "1TB Portable SSD External Drive",
      description:
        "Ultra-fast portable SSD with USB 3.2 Gen 2 support, 1TB capacity, and rugged aluminum housing.",
      price: 9999,
      images: ["https://images.unsplash.com/photo-1531492746076-161ca9bcad58"],
      totalStock: 35,
      status: "active",
      movements: {
        create: {
          quantity: 35,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  // Out of stock product
  const product11 = await prisma.product.upsert({
    where: { slug: "limited-edition-gaming-headset" },
    update: {},
    create: {
      slug: "limited-edition-gaming-headset",
      title: "Limited Edition Gaming Headset",
      description:
        "Premium gaming headset with 7.1 surround sound, limited edition design (currently out of stock).",
      price: 18999,
      images: ["https://images.unsplash.com/photo-1599669454699-248893623440"],
      totalStock: 0,
      status: "out_of_stock",
      movements: {
        create: {
          quantity: 0,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  // Inactive/discontinued product
  const product12 = await prisma.product.upsert({
    where: { slug: "old-model-mouse-pad" },
    update: {},
    create: {
      slug: "old-model-mouse-pad",
      title: "Classic Gaming Mouse Pad (Discontinued)",
      description: "Previous generation gaming mouse pad, now discontinued.",
      price: 799,
      images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"],
      totalStock: 5,
      status: "inactive",
      movements: {
        create: {
          quantity: 5,
          type: "IN",
          reason: "RESTOCK",
        },
      },
    },
  });

  console.log("✅ Seeded products:");
  console.log(
    `📦 ${product1.title} - NPR ${product1.price} (Stock: ${product1.totalStock})`,
  );
  console.log(
    `📦 ${product2.title} - NPR ${product2.price} (Stock: ${product2.totalStock})`,
  );
  console.log(
    `📦 ${product3.title} - NPR ${product3.price} (Stock: ${product3.totalStock})`,
  );
  console.log(
    `📦 ${product4.title} - NPR ${product4.price} (Stock: ${product4.totalStock})`,
  );
  console.log(
    `📦 ${product5.title} - NPR ${product5.price} (Stock: ${product5.totalStock})`,
  );
  console.log(
    `📦 ${product6.title} - NPR ${product6.price} (Stock: ${product6.totalStock})`,
  );
  console.log(
    `📦 ${product7.title} - NPR ${product7.price} (Stock: ${product7.totalStock})`,
  );
  console.log(
    `📦 ${product8.title} - NPR ${product8.price} (Stock: ${product8.totalStock})`,
  );
  console.log(
    `📦 ${product9.title} - NPR ${product9.price} (Stock: ${product9.totalStock})`,
  );
  console.log(
    `📦 ${product10.title} - NPR ${product10.price} (Stock: ${product10.totalStock})`,
  );
  console.log(
    `📦 ${product11.title} - NPR ${product11.price} (Stock: ${product11.totalStock}) ⚠️ OUT OF STOCK`,
  );
  console.log(
    `📦 ${product12.title} - NPR ${product12.price} (Stock: ${product12.totalStock}) ❌ INACTIVE`,
  );

  console.log("\n🎉 Product seeding completed!");
  console.log(`📊 Total products seeded: 12`);
  console.log(`✅ Active products: 10`);
  console.log(`⚠️ Out of stock: 1`);
  console.log(`❌ Inactive: 1`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during product seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
