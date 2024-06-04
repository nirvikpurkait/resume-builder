import EducationDetails from "@/components/resume-form/education-details";
import BasicDetails from "@/components/resume-form/basic-details";
import React from "react";
import WorkingDetails from "@/components/resume-form/working-details";
import SkillList from "@/components/resume-form/skills-details/skill-list";
import Wrapper from "@/components/resume-form";
import ProjectDetails from "@/components/resume-form/project/server-wrapper";
import SkillsDetails from "@/components/resume-form/skills-details/client-form";
import DownloadButton from "@/components/buttons/download-button";
import { cn } from "@/lib/shadcn-ui/utils";

export default function StudentPage() {
  return (
    <div className={cn(`relative min-h-[100vh]`)}>
      <Wrapper
        basic={<BasicDetails />}
        education={<EducationDetails />}
        work={<WorkingDetails />}
        project={<ProjectDetails />}
        skills={<SkillsDetails skillList={<SkillList />} />}
      />
      <DownloadButton className={cn(`fixed bottom-5 left-5`)} />
    </div>
  );
}
