"use client";

import { saveSkill } from "@/app/api/server-actions/save-skill-info.sa";
import React, { useState } from "react";

export default function ClientForm({
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
    <form>
      <label htmlFor="skill">Add a skill:</label>
      <input
        type="text"
        id="skill"
        name="skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />

      <div>{skillList}</div>
      <button onClick={addSkillToDB} type="button">
        Save skill
      </button>
    </form>
  );
}
