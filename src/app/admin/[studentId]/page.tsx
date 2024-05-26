import StudentDetails from "@/components/individual-student-detail/student-detail";
import React from "react";

export default async function StudentDetailsPage({
  params,
}: {
  params: { studentId: string };
}) {
  return <StudentDetails studentId={params.studentId}></StudentDetails>;
}
