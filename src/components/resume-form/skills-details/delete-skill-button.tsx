"use client";

import { deleteSkillRecord } from "@/app/api/server-actions/delete-skill-record.sa";
import React from "react";

export default function DeleteSkillButton({ skillId }: { skillId: string }) {
  async function deleteSkillFromDB(skillId: string) {
    await deleteSkillRecord(skillId);
  }

  return (
    <button type="button" onClick={() => deleteSkillFromDB(skillId)}>
      delete
    </button>
  );
}
