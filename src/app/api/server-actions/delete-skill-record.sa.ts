"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { prisma } from "@/database";
import { revalidateTag } from "next/cache";

export async function deleteSkillRecord(recordId: string) {
  await prisma.skills.delete({
    where: {
      id: recordId,
    },
  });

  revalidateTag(revalidateUserDetails);
}
