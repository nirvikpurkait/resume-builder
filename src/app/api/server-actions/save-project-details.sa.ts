"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { TProject } from "@/components/resume-form/project/server-wrapper";
import { prisma } from "@/database";
import { getCookie } from "@/utils/cookies/server";
import { id } from "@/utils/id";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProjectDetails(
  details: Pick<TProject, "projectTitle"> & {
    overview: string;
    liveLink: string;
    sourceLink: string;
    projectRecordId: string;
  }
) {
  const { liveLink, overview, projectRecordId, projectTitle, sourceLink } =
    details;

  const userId = getCookie("userId");
  if (!userId) redirect("/");

  const resumeId = await prisma.resumeDetails.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!resumeId?.id) redirect("/");

  await prisma.projects.upsert({
    create: {
      id: id(),
      projectTitle: projectTitle,
      liveLink: liveLink,
      overview: overview,
      sourceLink: sourceLink,
      resumeDetailsId: resumeId.id,
    },
    update: {
      liveLink: liveLink,
      overview: overview,
      projectTitle: projectTitle,
      sourceLink: sourceLink,
    },
    where: {
      id: projectRecordId,
    },
  });

  revalidateTag(revalidateUserDetails);
}
