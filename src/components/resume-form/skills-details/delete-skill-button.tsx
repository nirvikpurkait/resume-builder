"use client";

import { deleteSkillRecord } from "@/app/api/server-actions/delete-skill-record.sa";
import { cn } from "@/lib/shadcn-ui/utils";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DeleteSkillButton({ skillId }: { skillId: string }) {
  async function deleteSkillFromDB(skillId: string) {
    await deleteSkillRecord(skillId);
  }

  return (
    <button
      type="button"
      className={cn(
        `rounded-br-md rounded-tr-md border border-blue-500 p-2 py-[5px] text-red-500`
      )}
      onClick={() => deleteSkillFromDB(skillId)}
    >
      <FontAwesomeIcon icon={faXmark} className={cn(`text-lg`)} />
    </button>
  );
}
