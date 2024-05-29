"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { FormFields } from "@/components/resume-form/education-details";
import { prisma } from "@/database";
import { id } from "@/utils/id";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function saveEducationDetails(data: FormFields) {
  const { educationFields } = data;

  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  await prisma.education.deleteMany({
    where: {
      resumeDetails: {
        userId: userId,
      },
    },
  });

  const resumeId = await prisma.resumeDetails.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  await prisma.education.createMany({
    data: educationFields.map((field) => {
      return {
        id: id(),
        course: field.course,
        instituteName: field.instituteName,
        marks: field.marks,
        endDate: new Date(field.endDate),
        startDate: new Date(field.startDate),
        resumeDetailsId: resumeId?.id,
      };
    }),
  });

  revalidateTag(revalidateUserDetails);
}
