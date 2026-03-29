import { prisma } from "../lib/prisma.js";

export async function listVendorEarnings(vendorId: string) {
  const earnings = await prisma.vendorEarning.findMany({
    where: { vendorId },
    include: {
      order: { select: { id: true, finalAmount: true, status: true, createdAt: true } },
      affiliate: { select: { id: true, code: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalCommission = earnings.reduce((sum, e) => sum + e.commission, 0);
  return { earnings, totalCommission };
}
