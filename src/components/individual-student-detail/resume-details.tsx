import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import { formatDateWithSuffix } from "@/utils/date";
import React from "react";
import EducationDetails from "./education-details";

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
      email,
      github,
      linkedIn,
      phone,
      projects,
      skills,
      workExperiences,
    } = studentDetails.resumeDetails;
    return (
      <>
        <div>{careerObjective}</div>
        <div>{address}</div>
        <div>{formatDateWithSuffix(dateOfBirth)}</div>
        <div>
          <EducationDetails
            educationDetails={studentDetails.resumeDetails?.educations}
          />
        </div>
      </>
    );
  }
}
