"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { TProjectFormField } from "./server-wrapper";
import { deleteProjectRecord } from "@/app/api/server-actions/delete-project-details.sa";
import { saveProjectDetails } from "@/app/api/server-actions/save-project-details.sa";

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
    <form>
      {fields.map((field, number) => {
        return (
          <div key={field.id}>
            <div>
              <label htmlFor="project-title">Project title:</label>
              <input
                type="text"
                id="project-title"
                {...register(`fields.${number}.projectTitle`)}
              />
            </div>

            <div>
              <label htmlFor="overview">Overview:</label>
              <input
                type="text"
                id="overview"
                {...register(`fields.${number}.overview`)}
              />
            </div>

            <div>
              <label htmlFor="live-link">Live link:</label>
              <input
                type="text"
                id="live-link"
                {...register(`fields.${number}.liveLink`)}
              />
            </div>

            <div>
              <label htmlFor="source-link">Live link:</label>
              <input
                type="text"
                id="source-link"
                {...register(`fields.${number}.sourceLink`)}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                deleteDetailFromDB(field.projectRecordId);
              }}
            >
              Delete
            </button>

            <button type="button" onClick={() => saveDetailsToDB(number)}>
              Save
            </button>
          </div>
        );
      })}

      <button type="button" onClick={() => addNewField()}>
        Add new field
      </button>
    </form>
  );
}
