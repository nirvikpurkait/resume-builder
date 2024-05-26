import { cn } from "@/lib/shadcn-ui/utils";
import { getAllStudents } from "@/utils/students-list";
import Link from "next/link";
import React from "react";

export default async function Admin() {
  const students = await getAllStudents();

  return (
    <>
      <table className={cn(`w-full p-4`)}>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Student name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            return (
              <tr
                key={student.id}
                className={cn(`border-2 border-red-500 text-center`)}
              >
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.username}</td>
                <td>
                  <Link href={`/admin/${student.id}`}>See Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
