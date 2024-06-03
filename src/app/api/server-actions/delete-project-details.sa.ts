"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { prisma } from "@/database";
import { revalidateTag } from "next/cache";

export async function deleteProjectRecord(recordId: string) {
  await prisma.projects.delete({
    where: {
      id: recordId,
    },
  });

  revalidateTag(revalidateUserDetails);
}
