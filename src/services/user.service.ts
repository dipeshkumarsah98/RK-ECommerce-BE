import { prisma } from "../lib/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "../types/user.type.js";
import { ConflictError, NotFoundError } from "../lib/errors.js";
import { appEvents } from "../events/emitter.js";
import { AppEvent } from "../events/types.js";

export async function createUser(input: CreateUserInput) {
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ConflictError(
      `User with this email ${input.email} already exists`,
    );
  }

  // Create the user with addresses
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      roles: input.roles,
      isActive: input.isActive ?? true,
      extras: input.extras,
      ...(input.addresses && input.addresses.length > 0
        ? {
            addresses: {
              create: input.addresses.map((addr) => ({
                addressType: addr.addressType,
                street_address: addr.street_address,
                city: addr.city,
                state: addr.state,
                postal_code: addr.postal_code,
                isDefault: addr.isDefault ?? false,
              })),
            },
          }
        : {}),
    },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      roles: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      extras: true,
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
  });

  // Emit USER_REGISTERED event
  appEvents.emit(AppEvent.USER_REGISTERED, {
    userId: user.id,
    email: user.email,
    name: user.name || "User",
    role: user.roles[0] || "customer",
  });

  return user;
}

export async function updateUserById(id: string, input: UpdateUserInput) {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  // If email is being updated, check for conflicts
  if (input.email && input.email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (emailExists) {
      throw new ConflictError("Email already in use by another user");
    }
  }

  // Separate addresses into updates and creates
  const addressUpdates: Array<{ id: string; data: any }> = [];
  const addressCreates: Array<any> = [];

  if (input.addresses && input.addresses.length > 0) {
    for (const addr of input.addresses) {
      if (addr.addressId) {
        // Update existing address
        // First verify the address belongs to this user
        const existingAddress = await prisma.address.findFirst({
          where: {
            id: addr.addressId,
            userId: id,
          },
        });

        if (!existingAddress) {
          throw new NotFoundError(
            `Address with ID ${addr.addressId} not found for this user`,
          );
        }

        addressUpdates.push({
          id: addr.addressId,
          data: {
            addressType: addr.addressType,
            street_address: addr.street_address,
            city: addr.city,
            state: addr.state,
            postal_code: addr.postal_code,
            isDefault: addr.isDefault,
          },
        });
      } else {
        // Create new address
        addressCreates.push({
          addressType: addr.addressType,
          street_address: addr.street_address,
          city: addr.city,
          state: addr.state,
          postal_code: addr.postal_code,
          isDefault: addr.isDefault ?? false,
        });
      }
    }
  }

  // Update the user and handle addresses in a transaction
  const updatedUser = await prisma.$transaction(async (tx) => {
    // Update user basic info
    const user = await tx.user.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.email !== undefined && { email: input.email }),
        ...(input.phone !== undefined && { phone: input.phone }),
        ...(input.roles !== undefined && { roles: input.roles }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
        ...(input.extras !== undefined && { extras: input.extras }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        roles: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        extras: true,
      },
    });

    // Update existing addresses
    for (const update of addressUpdates) {
      await tx.address.update({
        where: { id: update.id },
        data: update.data,
      });
    }

    // Create new addresses
    if (addressCreates.length > 0) {
      await tx.address.createMany({
        data: addressCreates.map((addr) => ({
          ...addr,
          userId: id,
        })),
      });
    }

    // Fetch complete user with addresses
    return tx.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        roles: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        extras: true,
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
    });
  });

  // Emit events based on what changed
  if (updatedUser) {
    // Track updated fields
    const updatedFields: string[] = [];

    // Check for email change
    if (input.email && input.email !== existingUser.email) {
      appEvents.emit(AppEvent.EMAIL_CHANGED, {
        userId: updatedUser.id,
        oldEmail: existingUser.email,
        newEmail: input.email,
        userName: updatedUser.name || "User",
      });
    }

    // Track other profile field changes
    if (input.name !== undefined && input.name !== existingUser.name) {
      updatedFields.push("name");
    }
    if (input.phone !== undefined && input.phone !== existingUser.phone) {
      updatedFields.push("phone");
    }
    if (input.roles !== undefined) {
      updatedFields.push("roles");
    }
    if (input.isActive !== undefined && input.isActive !== existingUser.isActive) {
      updatedFields.push("isActive");
    }
    if (input.addresses && input.addresses.length > 0) {
      updatedFields.push("addresses");
    }

    // Emit PROFILE_UPDATED if any non-email fields changed
    if (updatedFields.length > 0) {
      appEvents.emit(AppEvent.PROFILE_UPDATED, {
        userId: updatedUser.id,
        email: updatedUser.email,
        userName: updatedUser.name || "User",
        updatedFields,
      });
    }
  }

  return updatedUser!;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      lastLogin: true,
      phone: true,
      roles: true,
      createdAt: true,
      addresses: true,
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
