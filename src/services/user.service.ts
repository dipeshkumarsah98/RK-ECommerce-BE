import { prisma } from "../lib/prisma.js";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, phone: true, address: true, roles: true, createdAt: true },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function updateUser(
  id: string,
  data: { phone?: string; address?: string }
) {
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, email: true, phone: true, address: true, roles: true, createdAt: true },
  });
}
