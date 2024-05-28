import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import { formatDateWithSuffix } from "@/utils/date";
import React from "react";
import EducationDetails from "./education-details";
import CareerObjective from "./career-objective";
import { cn } from "@/lib/shadcn-ui/utils";
import Skills from "./skills";
import ProjectDetails from "./project-details";
import WorkExperience from "./work-experience";

export default async function ResumeDetails({
  studentId,
}: {
  studentId: string;
}) {
  const studentDetails = await cachedGetUserDetails(studentId);

  if (!studentDetails?.resumeDetails) return null;
  else {
    const {
      address,
      careerObjective,
      dateOfBirth,
      educations,
      projects,
      skills,
      workExperiences,
    } = studentDetails.resumeDetails;
    return (
      <>
        <div className={cn(`space-y-8`)}>
          <CareerObjective careerObjective={careerObjective} />

          <EducationDetails educationDetails={educations} />

          <Skills skillsDetails={skills} />

          <ProjectDetails projectDetails={projects} />

          <WorkExperience workExperience={workExperiences} />
        </div>
      </>
    );
  }
}
