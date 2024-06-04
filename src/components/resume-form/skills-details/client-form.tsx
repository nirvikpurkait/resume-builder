"use client";

import { saveSkill } from "@/app/api/server-actions/save-skill-info.sa";
import { cn } from "@/lib/shadcn-ui/utils";
import React, { useState } from "react";

export default function SkillsDetails({
  skillList,
}: {
  skillList: React.ReactNode;
}) {
  const [skill, setSkill] = useState("");

  const addSkillToDB = async () => {
    await saveSkill(skill);
    setSkill("");
  };

  return (
    <form
      className={cn(
        `m-auto mt-8 w-full max-w-[35rem] space-y-4 rounded-md border-2 border-solid border-blue-500 px-8 py-8 text-lg dark:border-0 dark:bg-white dark:text-black`
      )}
    >
      <div className={cn(`flex gap-4`)}>
        <label htmlFor="skill" className={cn(`w-[30%]`)}>
          Add a skill:
        </label>
        <input
          type="text"
          id="skill"
          name="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div>{skillList}</div>

      <div>
        <button
          onClick={addSkillToDB}
          className={cn(
            `ml-auto flex rounded-md bg-blue-500 px-5 py-2 text-white`
          )}
          type="button"
        >
          Add
        </button>
      </div>
    </form>
  );
}
