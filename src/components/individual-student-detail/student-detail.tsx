import React from "react";
import Name from "./name";
import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import Username from "./username";
import CareerObjective from "./career-objective";
import ResumeDetails from "./resume-details";

export default async function StudentDetails({
  studentId,
}: {
  studentId: string;
}) {
  const studentDetails = await cachedGetUserDetails(studentId);
  if (studentDetails === null) return <></>;

  return (
    <div>
      <Name name={studentDetails.name} />
      <Username username={studentDetails.username} />

      <ResumeDetails studentId={studentId} />
    </div>
  );
}
