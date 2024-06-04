import { cn } from "@/lib/shadcn-ui/utils";
import { getAllStudents } from "@/utils/students-list";
import Link from "next/link";
import React from "react";

export default async function Admin() {
  const students = await getAllStudents();

  return (
    <div className={cn(`overflow-x-auto px-16 pt-16`)}>
      <table className={cn(`block min-w-[45rem] text-lg`)}>
        <thead className={cn(`block bg-blue-500 text-xl text-white`)}>
          <tr
            className={cn(`flex w-full justify-between border-b border-white`)}
          >
            <th className={cn(`basis-[12%] border-r `)}>Sl.No</th>
            <th className={cn(`basis-full border-l border-r`)}>Student name</th>
            <th className={cn(`basis-[40%] border-l border-r`)}>Username</th>
            <th className={cn(`basis-[40%] border-l`)}>Actions</th>
          </tr>
        </thead>
        <tbody className={cn(`block`)}>
          {students.map((student, index) => {
            return (
              <tr
                key={student.id}
                className={cn(
                  `flex w-full border-b border-blue-500 transition-all hover:bg-slate-300/50 dark:border-white dark:hover:bg-slate-300/10`
                )}
              >
                <td className={cn(`basis-[12%] border-r text-center `)}>
                  {index + 1}
                </td>
                <td className={cn(`basis-full border-l border-r`)}>
                  <span className={cn(`px-2`)}>{student.name}</span>
                </td>
                <td className={cn(`basis-[40%] border-l border-r`)}>
                  <span className={cn(`px-2`)}>{student.username}</span>
                </td>
                <td className={cn(`flex basis-[40%] justify-center border-l`)}>
                  <Link
                    href={`/admin/${student.id}`}
                    className={cn(
                      `flex justify-center text-blue-500 underline`
                    )}
                  >
                    See Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
