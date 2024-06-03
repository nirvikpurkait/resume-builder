"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { id } from "@/utils/id";
import { revalidateTag } from "next/cache";

export async function saveSkill(skillName: string) {
  const userId = getCookie("userId");

  if (!userId) return;

  const resumeId = await prisma.resumeDetails.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  await prisma.skills.create({
    data: {
      skillName,
      id: id(),
      resumeDetailsId: resumeId?.id,
    },
  });

  revalidateTag(revalidateUserDetails);
}
