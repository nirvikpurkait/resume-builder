import EducationDetails from "@/components/resume-form/education-details";
import BasicDetails from "@/components/resume-form/basic-details";
import React from "react";
import WorkingDetails from "@/components/resume-form/working-details";
import ClientForm from "@/components/resume-form/skills-details/client-form";
import SkillList from "@/components/resume-form/skills-details/skill-list";

export default function StudentPage() {
  return (
    <div>
      {/* <BasicDetails/> */}
      {/* <EducationDetails /> */}
      {/* <WorkingDetails /> */}
      <ClientForm skillList={<SkillList />} />
    </div>
  );
}
