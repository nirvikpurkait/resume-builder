import { getSkillsDetails } from "@/app/api/server-actions/get-skills-details.sa";
import React from "react";
import DeleteSkillButton from "./delete-skill-button";

export default async function SkillList() {
  const skillList = await getSkillsDetails();

  return (
    <div>
      {skillList.map((skill) => {
        return (
          <span key={skill.id}>
            <span>{skill.skillName}</span>
            <DeleteSkillButton skillId={skill.id} />
          </span>
        );
      })}
    </div>
  );
}
