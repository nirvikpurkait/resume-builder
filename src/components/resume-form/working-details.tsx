"use client";

import { getWorkingDetails } from "@/app/api/server-actions/get-working-details.sa";
import { saveWorkingDetails } from "@/app/api/server-actions/save-working-details.sa";
import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import AddNewEntry from "../buttons/add-new-entry";

export type TWorkingDetailsFormFields = Omit<
  NonNullable<Awaited<ReturnType<typeof prisma.workExperience.findFirst>>>,
  "id" | "startDate" | "endDate" | "resumeDetailsId"
> & {
  workingDetailsId: string;
  startDate: string;
  endDate: string;
};

export type WorkingDetailsFormFields = {
  workingDetails: TWorkingDetailsFormFields[];
};

export default function WorkingDetails() {
  const { register, control, getValues } = useForm<WorkingDetailsFormFields>({
    defaultValues: async () => getWorkingDetails(),
  });
  const { refresh } = useRouter();

  const { fields, append } = useFieldArray<WorkingDetailsFormFields>({
    name: "workingDetails",
    control,
  });

  const saveDetails = async (index: number) => {
    const { workingDetails } = getValues();
    await saveWorkingDetails(workingDetails[index]);
    refresh();
  };

  const appendNewRecord = () => {
    append({
      companyName: "",
      designation: "",
      location: "",
      workDescription: "",
      workingDetailsId: "",
      endDate: "",
      startDate: "",
    });
  };

  return (
    <form
      className={cn(
        `m-auto mt-8 w-full max-w-[35rem] space-y-4 rounded-md border-2 border-solid border-blue-500 px-8 py-8 text-lg dark:border-0 dark:bg-white dark:text-black`
      )}
    >
      {fields.map((field, number) => (
        <div key={field.id} className={cn(`space-y-4 text-lg`)}>
          <div className={cn(`flex gap-4`)}>
            <label htmlFor={`designation-${number}`} className={cn(`w-[30%]`)}>
              Designation:
            </label>
            <input
              type="text"
              id={`designation-${number}`}
              {...register(`workingDetails.${number}.designation`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            />
          </div>

          <div className={cn(`flex gap-4`)}>
            <label htmlFor={`company-name-${number}`} className={cn(`w-[30%]`)}>
              Company name:
            </label>
            <input
              type="text"
              id={`company-name-${number}`}
              {...register(`workingDetails.${number}.companyName`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            />
          </div>

          <div className={cn(`flex gap-4`)}>
            <label htmlFor={`location-${number}`} className={cn(`w-[30%]`)}>
              Location:
            </label>
            <input
              type="text"
              id={`location-${number}`}
              {...register(`workingDetails.${number}.location`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            />
          </div>

          <div className={cn(`flex gap-4`)}>
            <label
              htmlFor={`work-description-${number}`}
              className={cn(`w-[30%]`)}
            >
              Work description:
            </label>
            <textarea
              id={`work-description-${number}`}
              {...register(`workingDetails.${number}.workDescription`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            ></textarea>
          </div>

          <div className={cn(`flex gap-4`)}>
            <label htmlFor={`location-${number}`} className={cn(`w-[30%]`)}>
              Start date:
            </label>
            <input
              type="date"
              id={`xtart-date-${number}`}
              {...register(`workingDetails.${number}.startDate`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            />
          </div>

          <div className={cn(`flex gap-4`)}>
            <label htmlFor={`end-date-${number}`} className={cn(`w-[30%]`)}>
              End date:
            </label>
            <input
              type="date"
              id={`end-date-${number}`}
              {...register(`workingDetails.${number}.endDate`)}
              className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
            />
          </div>

          <div>
            <button
              className={cn(`rounded-md bg-green-500 px-4 py-2 text-white`)}
              type="button"
              onClick={() => saveDetails(number)}
            >
              Save
            </button>
          </div>
        </div>
      ))}

      <AddNewEntry
        className={cn(`fixed bottom-5 right-5`)}
        type="button"
        onClick={() => appendNewRecord()}
      />
    </form>
  );
}
