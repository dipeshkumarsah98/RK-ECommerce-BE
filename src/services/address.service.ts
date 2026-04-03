import { prisma } from "../lib/prisma.js";
import { BadRequestError } from "../lib/errors.js";
import type { CreateAddressInput } from "../types/address.type.js";

export async function createAddress(input: CreateAddressInput) {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: input.userId },
  });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  // If isDefault is true, unset other defaults of the same type
  if (input.isDefault) {
    await prisma.address.updateMany({
      where: {
        userId: input.userId,
        addressType: input.addressType,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: input.userId,
      addressType: input.addressType,
      street_address: input.street_address,
      city: input.city,
      state: input.state,
      postal_code: input.postal_code,
      isDefault: input.isDefault ?? false,
    },
  });

  return address;
}
