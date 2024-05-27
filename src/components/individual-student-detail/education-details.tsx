import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
import { formatDateWithSuffix } from "@/utils/date";
import React from "react";

type EducationDetailsProps = Awaited<
  ReturnType<typeof prisma.education.findMany>
>;

export default async function EducationDetails(props: {
  educationDetails: EducationDetailsProps;
}) {
  return (
    <div>
      <table className={cn(`block text-lg`)}>
        <thead className={cn(`block bg-blue-500 text-xl text-white`)}>
          <tr
            className={cn(`flex w-full justify-between border-b border-white`)}
          >
            <th className={cn(`basis-full border-r`)}>Course</th>
            <th className={cn(`basis-full border-l border-r`)}>Institute</th>
            <th className={cn(`basis-[30%] border-l border-r`)}>Marks</th>
            <th className={cn(`basis-[40%] border-l`)}>Duration</th>
          </tr>
        </thead>
        <tbody className={cn(`block `)}>
          {props.educationDetails.map((courseDetails) => {
            const { id, course, endDate, instituteName, startDate, marks } =
              courseDetails;
            return (
              <tr
                key={id}
                className={cn(
                  `flex w-full border-b border-blue-500 transition-all hover:bg-slate-300/50 dark:border-white dark:hover:bg-slate-300/10`
                )}
              >
                <td className={cn(`w-full basis-full border-r`)}>
                  <span className={cn(`px-4`)}>{course}</span>
                </td>
                <td className={cn(`w-full basis-full border-l border-r`)}>
                  <span className={cn(`px-4`)}>{instituteName}</span>
                </td>
                <td
                  className={cn(
                    `flex w-full basis-[30%] items-center justify-center border-l border-r`
                  )}
                >
                  <span>{marks?.toString()}</span>
                </td>
                <td
                  className={cn(
                    `flex w-full basis-[40%] flex-col items-center justify-center border-l`
                  )}
                >
                  <>{new Date(startDate).getFullYear()}</>
                  {endDate && (
                    <>
                      <> - </>
                      <>{new Date(endDate).getFullYear()}</>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
