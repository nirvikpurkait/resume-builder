"use server";

import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { redirect } from "next/navigation";

export async function getSkillsDetails() {
  const userId = getCookie("userId");

  if (!userId) redirect("/");

  const skillList = await prisma.skills.findMany({
    select: {
      id: true,
      skillName: true,
    },
    where: {
      resumeDetails: {
        userId,
      },
    },
  });

  return skillList;
}
