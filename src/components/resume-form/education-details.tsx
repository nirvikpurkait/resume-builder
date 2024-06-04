"use client";

import { getEducationInfo } from "@/app/api/server-actions/get-education-info.sa";
import { deleteEducationDetails } from "@/app/api/server-actions/delete-education-details.sa";
import { prisma } from "@/database";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { saveEducationDetails } from "@/app/api/server-actions/save-education-info.sa";
import AddNewEntry from "../buttons/add-new-entry";
import { cn } from "@/lib/shadcn-ui/utils";

export type TEducationDetails = Omit<
  NonNullable<Awaited<ReturnType<typeof prisma.education.findFirst>>>,
  "resumeDetailsId"
>;

export type TEducaionFields = Pick<
  TEducationDetails,
  "instituteName" | "course"
>;

export type FormFields = {
  educationFields: (TEducaionFields & {
    marks: number;
    startDate: string;
    endDate: string;
    detailsId: string;
  })[];
};

export type TDetailsToSave = FormFields["educationFields"][number];

export default function EducationDetails() {
  const { register, control, getValues } = useForm<FormFields>({
    defaultValues: async () => getEducationInfo(),
  });

  const { fields, append, remove } = useFieldArray<FormFields>({
    name: "educationFields",
    control,
  });

  const deleteThisField = async (fieldIndex: number, detailsId: string) => {
    remove(fieldIndex);
    if (detailsId !== "") await deleteEducationDetails(detailsId);
  };

  const saveTheFieldToDB = async (index: number) => {
    const data = getValues().educationFields[index];
    await saveEducationDetails(data);
  };

  const addAnotherField = () => {
    append({
      course: "",
      endDate: "",
      instituteName: "",
      marks: 0,
      startDate: "",
      detailsId: "",
    });
  };

  return (
    <form
      className={cn(
        `m-auto mt-8 w-full max-w-[35rem] space-y-4 rounded-md border-2 border-solid border-blue-500 px-8 py-8 text-lg dark:border-0 dark:bg-white dark:text-black`
      )}
    >
      {fields.map((field, index) => {
        return (
          <div key={field.id} className={cn(`space-y-4 text-lg`)}>
            <div className={cn(`flex gap-4`)}>
              <label htmlFor="institute" className={cn(`w-[30%]`)}>
                Institute name:
              </label>
              <input
                type="text"
                id="institute"
                {...register(`educationFields.${index}.instituteName`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="course" className={cn(`w-[30%]`)}>
                Course name:
              </label>
              <input
                type="text"
                id="course"
                {...register(`educationFields.${index}.course`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="marks" className={cn(`w-[30%]`)}>
                Marks:
              </label>
              <input
                type="text"
                id="marks"
                {...register(`educationFields.${index}.marks`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="start-date" className={cn(`w-[30%]`)}>
                Start date:
              </label>
              <input
                type="date"
                id="start-date"
                {...register(`educationFields.${index}.startDate`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="end-date" className={cn(`w-[30%]`)}>
                End date:
              </label>
              <input
                type="date"
                id="end-date"
                {...register(`educationFields.${index}.endDate`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex justify-between`)}>
              <button
                className={cn(`rounded-md bg-red-500 px-4 py-2 text-white`)}
                onClick={() => deleteThisField(index, field.detailsId)}
                type="button"
              >
                Delete
              </button>

              <button
                className={cn(`rounded-md bg-green-500 px-4 py-2 text-white`)}
                type="button"
                onClick={() => saveTheFieldToDB(index)}
              >
                Save
              </button>
            </div>
          </div>
        );
      })}

      <AddNewEntry
        className={cn(`fixed bottom-5 right-5`)}
        onClick={addAnotherField}
        type="button"
      />
    </form>
  );
}
