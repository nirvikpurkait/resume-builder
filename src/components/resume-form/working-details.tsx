"use client";

import { getWorkingDetails } from "@/app/api/server-actions/get-working-details.sa";
import { saveWorkingDetails } from "@/app/api/server-actions/save-working-details.sa";
import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

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
    <form className={cn(`space-y-4`)}>
      {fields.map((field, number) => (
        <div key={field.id}>
          <div>
            <input
              type="text"
              id=""
              {...register(`workingDetails.${number}.designation`)}
            />
          </div>

          <div>
            <input
              type="text"
              id=""
              {...register(`workingDetails.${number}.companyName`)}
            />
          </div>

          <div>
            <input
              type="text"
              id=""
              {...register(`workingDetails.${number}.location`)}
            />
          </div>

          <div>
            <input
              type="text"
              id=""
              {...register(`workingDetails.${number}.workDescription`)}
            />
          </div>

          <div>
            <input
              type="date"
              id=""
              {...register(`workingDetails.${number}.startDate`)}
            />
          </div>

          <div>
            <input
              type="date"
              id=""
              {...register(`workingDetails.${number}.endDate`)}
            />
          </div>

          <button type="button" onClick={() => saveDetails(number)}>
            Save
          </button>
        </div>
      ))}

      <button type="button" onClick={() => appendNewRecord()}>
        Add another record
      </button>
    </form>
  );
}
