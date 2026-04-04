import { prisma } from "../lib/prisma.js";

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      phone: true,
      address: true,
      roles: true,
      createdAt: true,
    },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function searchUsers(
  search?: string,
  roles?: string[],
  page = 1,
  perPage = 10,
  sortBy: "roles" | "updatedAt" | "createdAt" | "name" = "updatedAt",
  sortOrder: "asc" | "desc" = "desc",
  extras: boolean = false,
) {
  const skip = (page - 1) * perPage;

  const searchConditions = search
    ? {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { name: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const roleConditions =
    roles && roles.length > 0
      ? {
          roles: {
            hasSome: roles,
          },
        }
      : {};

  const whereClause = {
    ...searchConditions,
    ...roleConditions,
  };

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where: whereClause,
      skip,
      take: perPage,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        roles: true,
        createdAt: true,
        extras: extras,
        addresses: {
          select: {
            id: true,
            addressType: true,
            street_address: true,
            city: true,
            state: true,
            postal_code: true,
            isDefault: true,
          },
        },
      },
    }),
    prisma.user.count({
      where: whereClause,
    }),
  ]);

  return { items, total, page, perPage, search, roles };
}

export async function getUserAddresses(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return addresses;
}

export async function updateUser(
  id: string,
  data: { phone?: string; address?: string },
) {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      phone: true,
      address: true,
      roles: true,
      createdAt: true,
    },
  });
}
