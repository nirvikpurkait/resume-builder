import { prisma } from "@/database";
import React from "react";
import DetailsHeading from "./details-heading";
import { cn } from "@/lib/shadcn-ui/utils";

type SkillsDetailsProps = Awaited<ReturnType<typeof prisma.skills.findMany>>;

export default function Skills(props: { skillsDetails: SkillsDetailsProps }) {
  return (
    <div>
      <DetailsHeading>Skills</DetailsHeading>
      <div className={cn(`flex flex-wrap gap-4`)}>
        {props.skillsDetails.map((skill) => (
          <span
            className={cn(
              `rounded-lg bg-blue-700 px-5 py-2 text-xl text-white`
            )}
            key={skill.id}
          >
            {skill.skillName}
          </span>
        ))}
      </div>
    </div>
  );
}
