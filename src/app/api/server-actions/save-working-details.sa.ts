"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { TWorkingDetailsFormFields } from "@/components/resume-form/working-details";
import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { id as createId } from "@/utils/id";
import { revalidateTag } from "next/cache";

export async function saveWorkingDetails(data: TWorkingDetailsFormFields) {
  const userId = getCookie("userId");

  if (!userId) return;

  const resumeId = await prisma.resumeDetails.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  const {
    companyName,
    designation,
    endDate,
    location,
    startDate,
    workDescription,
    workingDetailsId,
  } = data;

  await prisma.workExperience.upsert({
    create: {
      companyName,
      designation,
      location,
      startDate: new Date(startDate),
      workDescription,
      endDate: new Date(endDate),
      id: createId(),
      resumeDetailsId: resumeId?.id,
    },
    update: {
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      companyName,
      designation,
      location,
      workDescription,
    },
    where: {
      id: workingDetailsId,
    },
  });

  revalidateTag(revalidateUserDetails);
}
