"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { TProjectFormField } from "./server-wrapper";
import { deleteProjectRecord } from "@/app/api/server-actions/delete-project-details.sa";
import { saveProjectDetails } from "@/app/api/server-actions/save-project-details.sa";
import { cn } from "@/lib/shadcn-ui/utils";
import AddNewEntry from "@/components/buttons/add-new-entry";

export default function ProjectForm({
  defaultValues,
}: {
  defaultValues: Pick<TProjectFormField, "fields">;
}) {
  const { register, control, getValues } = useForm<TProjectFormField>({
    defaultValues: defaultValues,
  });

  const { fields, append } = useFieldArray<TProjectFormField>({
    name: "fields",
    control,
  });

  const saveDetailsToDB = async (index: number) => {
    const values = getValues().fields[index];
    await saveProjectDetails(values);
  };
  const deleteDetailFromDB = async (recordId: string) => {
    await deleteProjectRecord(recordId);
  };

  const addNewField = () => {
    append({
      projectTitle: "",
      overview: "",
      liveLink: "",
      projectRecordId: "",
      sourceLink: "",
    });
  };

  return (
    <form
      className={cn(
        `m-auto mt-8 w-full max-w-[35rem] space-y-4 rounded-md border-2 border-solid border-blue-500 px-8 py-8 text-lg dark:border-0 dark:bg-white dark:text-black`
      )}
    >
      {fields.map((field, number) => {
        return (
          <div key={field.id} className={cn(`space-y-4 text-lg`)}>
            <div className={cn(`flex gap-4`)}>
              <label htmlFor="project-title" className={cn(`w-[30%]`)}>
                Project title:
              </label>
              <input
                type="text"
                id="project-title"
                {...register(`fields.${number}.projectTitle`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="overview" className={cn(`w-[30%]`)}>
                Overview:
              </label>
              <input
                type="text"
                id="overview"
                {...register(`fields.${number}.overview`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="live-link" className={cn(`w-[30%]`)}>
                Live link:
              </label>
              <input
                type="text"
                id="live-link"
                {...register(`fields.${number}.liveLink`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className={cn(`flex gap-4`)}>
              <label htmlFor="source-link" className={cn(`w-[30%]`)}>
                Live link:
              </label>
              <input
                type="text"
                id="source-link"
                {...register(`fields.${number}.sourceLink`)}
                className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  deleteDetailFromDB(field.projectRecordId);
                }}
                className={cn(`rounded-md bg-red-500 px-4 py-2 text-white`)}
              >
                Delete
              </button>

              <button
                type="button"
                onClick={() => saveDetailsToDB(number)}
                className={cn(`rounded-md bg-green-500 px-4 py-2 text-white`)}
              >
                Save
              </button>
            </div>
          </div>
        );
      })}

      <AddNewEntry
        type="button"
        onClick={() => addNewField()}
        className={`fixed bottom-5 right-5`}
      />
    </form>
  );
}
