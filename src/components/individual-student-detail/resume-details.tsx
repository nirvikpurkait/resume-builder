import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import React from "react";

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
        <div>{new Date(dateOfBirth).toTimeString()}</div>
      </>
    );
  }
}
