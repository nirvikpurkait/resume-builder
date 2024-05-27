import StudentDetails from "@/components/individual-student-detail";
import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default async function StudentDetailsPage({
  params,
}: {
  params: { studentId: string };
}) {
  return (
    <main className={cn(`m-auto w-full max-w-[70rem]`)}>
      <StudentDetails studentId={params.studentId}></StudentDetails>
    </main>
  );
}
