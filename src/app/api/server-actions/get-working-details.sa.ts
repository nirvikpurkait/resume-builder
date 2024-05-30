"use server";

import {
  TWorkingDetailsFormFields,
  WorkingDetailsFormFields,
} from "@/components/resume-form/working-details";
import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { formatDateForInputType } from "@/utils/date";

export async function getWorkingDetails(): Promise<WorkingDetailsFormFields> {
  const userId = getCookie("userId");

  if (!userId) return {} as WorkingDetailsFormFields;

  const workDetails = await prisma.workExperience.findMany({
    where: {
      resumeDetails: {
        userId: userId,
      },
    },
  });

  const formattedWorkDetails: TWorkingDetailsFormFields[] = workDetails.map(
    (work) => {
      const {
        companyName,
        designation,
        endDate,
        id,
        location,
        resumeDetailsId,
        startDate,
        workDescription,
      } = work;

      return {
        companyName,
        designation,
        location,
        workDescription,
        endDate: endDate
          ? formatDateForInputType(endDate)
          : formatDateForInputType(new Date()),
        workingDetailsId: id,
        startDate: formatDateForInputType(startDate),
      };
    }
  );

  return {
    workingDetails: formattedWorkDetails,
  };
}
