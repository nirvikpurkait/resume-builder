"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { TDetailsToSave } from "@/components/resume-form/education-details";
import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { id as creteId } from "@/utils/id";
import { revalidateTag } from "next/cache";

// Todo: handle the error for id that is not present in database

export async function saveEducationDetails(data: TDetailsToSave) {
  const { course, detailsId, endDate, instituteName, marks, startDate } = data;

  const userId = getCookie("userId");

  if (!userId) return;

  const resumeId = (
    await prisma.resumeDetails.findFirst({
      where: {
        userId: userId,
      },
    })
  )?.id;

  await prisma.education.upsert({
    update: {
      course,
      instituteName,
      marks,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
    },
    where: {
      id: detailsId,
    },
    create: {
      course,
      id: creteId(),
      instituteName,
      marks,
      startDate: new Date(startDate),
      resumeDetailsId: resumeId,
      endDate: new Date(endDate),
    },
  });

  revalidateTag(revalidateUserDetails);
}
