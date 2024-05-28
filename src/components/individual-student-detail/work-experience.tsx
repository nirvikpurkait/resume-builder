import { prisma } from "@/database";
import React from "react";
import DetailsHeading from "./details-heading";
import { cn } from "@/lib/shadcn-ui/utils";

type WorkExperienceProps = Awaited<
  ReturnType<typeof prisma.workExperience.findMany>
>;

export default function WorkExperience({
  workExperience,
}: {
  workExperience: WorkExperienceProps;
}) {
  return (
    <div>
      <DetailsHeading>Work Experience</DetailsHeading>
      <div className={cn(`flex flex-wrap gap-8`)}>
        {workExperience.map((work) => {
          const {
            companyName,
            designation,
            endDate,
            id,
            location,
            workDescription,
            startDate,
          } = work;
          return (
            <div key={id} className={cn(`w-full min-w-[20rem] max-w-[30rem]`)}>
              <div className={cn(`text-2xl`)}>{designation}</div>
              <div>
                {companyName} , {location}
              </div>
              <div className={cn(`mt-2`)}>{workDescription}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
