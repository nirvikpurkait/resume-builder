"use server";

import { FormFields } from "@/components/resume-form/education-details";
import { prisma } from "@/database";
import { formatDateForInputType } from "@/utils/date";
import { cookies } from "next/headers";

export async function getEducationInfo(): Promise<FormFields> {
  const cookieStore = cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) return {} as FormFields;

  const educationDetails = await prisma.education.findMany({
    where: {
      resumeDetails: {
        userId: userId,
      },
    },
    select: {
      instituteName: true,
      course: true,
      endDate: true,
      startDate: true,
      marks: true,
      id: true,
    },
  });

  const value = educationDetails.map((detail) => {
    const { course, endDate, instituteName, marks, startDate, id } = detail;
    return {
      course,
      endDate: endDate
        ? formatDateForInputType(endDate)
        : formatDateForInputType(new Date()),
      instituteName,
      marks: marks ? Number(marks) : 0,
      startDate: formatDateForInputType(startDate),
      detailsId: id,
    };
  });

  return { educationFields: value };
}
