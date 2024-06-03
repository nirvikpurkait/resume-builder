"use server";

import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import { TProjectFormField } from "@/components/resume-form/project/server-wrapper";
import { getCookie } from "@/utils/cookies/server";

export async function getProjectDetails(): Promise<TProjectFormField> {
  const userId = getCookie("userId");

  if (!userId) return {} as TProjectFormField;

  const userDetails = await cachedGetUserDetails(userId);

  if (!userDetails?.resumeDetails) return {} as TProjectFormField;

  const formattedFormField: TProjectFormField = {
    fields: userDetails.resumeDetails.projects.map((project) => {
      return {
        liveLink: project.liveLink as string,
        sourceLink: project.sourceLink as string,
        projectTitle: project.projectTitle,
        overview: project.overview ? project.overview : "",
        projectRecordId: project.id,
      };
    }),
  };

  return formattedFormField;
}
