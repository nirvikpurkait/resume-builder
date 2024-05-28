"use server";

import { TBasicDetails } from "@/components/resume-form/basic-details";
import { prisma } from "@/database";
import { cookies } from "next/headers";

export async function getBasicInfo(): Promise<TBasicDetails> {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  const resumeDetails = await prisma.resumeDetails.findFirst({
    where: {
      userId,
    },
    select: {
      careerObjective: true,
      address: true,
      dateOfBirth: true,
      linkedIn: true,
      github: true,
      phone: true,
      email: true,
    },
  });

  if (!resumeDetails) return {} as TBasicDetails;

  return resumeDetails;
}
