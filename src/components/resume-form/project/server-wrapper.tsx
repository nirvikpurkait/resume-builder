import React from "react";
import ProjectForm from "./form";
import { prisma } from "@/database";
import { getProjectDetails } from "@/app/api/server-actions/get-project-details.sa";

export type TProject = NonNullable<
  Awaited<ReturnType<typeof prisma.projects.findFirst>>
>;

export type TProjectFormField = {
  fields: (Pick<TProject, "projectTitle"> & {
    overview: string;
    liveLink: string;
    sourceLink: string;
    projectRecordId: string;
  })[];
};

export default async function ServerWrapper() {
  const projectDetails = await getProjectDetails();

  return <ProjectForm defaultValues={projectDetails} />;
}
