import { getSkillsDetails } from "@/app/api/server-actions/get-skills-details.sa";
import React from "react";
import DeleteSkillButton from "./delete-skill-button";
import { cn } from "@/lib/shadcn-ui/utils";

export default async function SkillList() {
  const skillList = await getSkillsDetails();

  return (
    <div className={cn(`flex flex-wrap gap-4 border text-white`)}>
      {skillList.map((skill) => {
        return (
          <span key={skill.id}>
            <span
              className={cn(
                `rounded-bl-md rounded-tl-md bg-blue-500 px-4 py-2`
              )}
            >
              {skill.skillName}
            </span>
            <DeleteSkillButton skillId={skill.id} />
          </span>
        );
      })}
    </div>
  );
}
