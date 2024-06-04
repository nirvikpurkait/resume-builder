"use client";

import { cn } from "@/lib/shadcn-ui/utils";
import React, { useState } from "react";

type ActiveSection = "basic" | "education" | "project" | "skills" | "work";

export default function Wrapper({
  basic,
  education,
  project,
  skills,
  work,
}: {
  basic: React.ReactNode;
  education: React.ReactNode;
  project: React.ReactNode;
  skills: React.ReactNode;
  work: React.ReactNode;
}) {
  const [activeState, setActiveState] = useState<ActiveSection>("basic");

  return (
    <>
      <nav
        className={cn(
          `flex justify-between gap-4 bg-blue-500 px-16 py-4 text-2xl text-white`
        )}
      >
        <button
          className={cn(`rounded-md px-4 py-2`, {
            "bg-white text-blue-500": activeState === "basic",
          })}
          onClick={() => setActiveState("basic")}
        >
          Basic details
        </button>
        <button
          className={cn(`rounded-md px-4 py-2`, {
            "bg-white text-blue-500": activeState === "education",
          })}
          onClick={() => setActiveState("education")}
        >
          Education details
        </button>
        <button
          className={cn(`rounded-md px-4 py-2`, {
            "bg-white text-blue-500": activeState === "work",
          })}
          onClick={() => setActiveState("work")}
        >
          Working details
        </button>
        <button
          className={cn(`rounded-md px-4 py-2`, {
            "bg-white text-blue-500": activeState === "project",
          })}
          onClick={() => setActiveState("project")}
        >
          Project details
        </button>
        <button
          className={cn(`rounded-md px-4 py-2`, {
            "bg-white text-blue-500": activeState === "skills",
          })}
          onClick={() => setActiveState("skills")}
        >
          Skills
        </button>
      </nav>
      {activeState === "basic" && basic}
      {activeState === "education" && education}
      {activeState === "project" && project}
      {activeState === "skills" && skills}
      {activeState === "work" && work}
    </>
  );
}
