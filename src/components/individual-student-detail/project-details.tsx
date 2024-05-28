import { prisma } from "@/database";
import React from "react";
import DetailsHeading from "./details-heading";
import { cn } from "@/lib/shadcn-ui/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { nameInitials } from "@/utils/name-initials";

type ProjectDetailsProps = Awaited<ReturnType<typeof prisma.projects.findMany>>;

export default function ProjectDetails({
  projectDetails,
}: {
  projectDetails: ProjectDetailsProps;
}) {
  return (
    <div>
      <DetailsHeading>Projects</DetailsHeading>

      <div
        className={cn(`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3`)}
      >
        {projectDetails.map((project) => {
          const {
            id,
            liveLink,
            overview,
            projectThumbnailUrl,
            projectTitle,
            sourceLink,
          } = project;

          return (
            <ProjectCard
              key={id}
              id={id}
              liveLink={liveLink}
              overview={overview}
              projectThumbnailUrl={projectThumbnailUrl}
              projectTitle={projectTitle}
              sourceLink={sourceLink}
            />
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard(
  props: Omit<ProjectDetailsProps[number], "resumeDetailsId">
) {
  const {
    id,
    liveLink,
    overview,
    projectThumbnailUrl,
    projectTitle,
    sourceLink,
  } = props;

  return (
    <div
      className={cn(
        `m-auto w-min rounded-md border border-blue-500 p-4 dark:border-white`
      )}
    >
      <div className={cn(`relative`)}>
        <ProjectThumbnail
          projectThumbnailUrl={projectThumbnailUrl}
          projectTitle={projectTitle}
        />
      </div>
      <div className={cn(`text-2xl`)}>{projectTitle}</div>
      <div>{overview}</div>
      <div className={cn(`mt-4 flex flex-wrap gap-2`)}>
        {sourceLink && (
          <a
            className={cn(
              `rounded-md bg-blue-500 px-4 py-1 text-lg text-white`
            )}
            href={sourceLink}
          >
            View Source
          </a>
        )}
        {liveLink && (
          <a
            className={cn(
              `rounded-md bg-blue-500 px-4 py-1 text-lg text-white`
            )}
            href={liveLink}
          >
            See Live
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectThumbnail(
  props: Pick<
    ProjectDetailsProps[number],
    "projectThumbnailUrl" | "projectTitle"
  >
) {
  return (
    <Avatar className={cn(`h-48 w-64 rounded-lg`)}>
      {props.projectThumbnailUrl && (
        <AvatarImage src={props.projectThumbnailUrl} alt="profile-picture" />
      )}
      <AvatarFallback className={cn(`rounded-sm`)}>
        {nameInitials(props.projectTitle, 1)}
      </AvatarFallback>
    </Avatar>
  );
}
