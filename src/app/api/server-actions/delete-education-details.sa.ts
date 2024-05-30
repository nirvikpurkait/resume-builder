"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { prisma } from "@/database";
import { revalidateTag } from "next/cache";

// Todo: handle the error for id that is not present in database

export async function deleteEducationDetails(id: string) {
  await prisma.education.delete({
    where: {
      id,
    },
  });

  revalidateTag(revalidateUserDetails);
}
