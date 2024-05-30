"use server";

import { TWorkingDetailsFormFields } from "@/components/resume-form/working-details";
import { prisma } from "@/database";
import { id as createId } from "@/utils/id";

export async function saveWorkingDetails(data: TWorkingDetailsFormFields) {
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
}
