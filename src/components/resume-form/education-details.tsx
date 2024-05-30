"use client";

import { getEducationInfo } from "@/app/api/server-actions/get-education-info.sa";
import { deleteEducationDetails } from "@/app/api/server-actions/delete-education-details.sa";
import { prisma } from "@/database";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { saveEducationDetails } from "@/app/api/server-actions/save-education-info.sa";

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

  return (
    <form>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <div>
              <label htmlFor="institute">Institute name:</label>
              <input
                type="text"
                id="institute"
                {...register(`educationFields.${index}.instituteName`)}
              />
            </div>

            <div>
              <label htmlFor="course">Course name:</label>
              <input
                type="text"
                id="course"
                {...register(`educationFields.${index}.course`)}
              />
            </div>

            <div>
              <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                id="marks"
                {...register(`educationFields.${index}.marks`)}
              />
            </div>

            <div>
              <label htmlFor="start-date">Start date:</label>
              <input
                type="date"
                id="start-date"
                {...register(`educationFields.${index}.startDate`)}
              />
            </div>

            <div>
              <label htmlFor="end-date">End date:</label>
              <input
                type="date"
                id="end-date"
                {...register(`educationFields.${index}.endDate`)}
              />
            </div>

            <button
              onClick={() => deleteThisField(index, field.detailsId)}
              type="button"
            >
              Delete
            </button>

            <button type="button" onClick={() => saveTheFieldToDB(index)}>
              Save
            </button>
          </div>
        );
      })}

      <button
        onClick={() =>
          append({
            course: "",
            endDate: "",
            instituteName: "",
            marks: 0,
            startDate: "",
            detailsId: "",
          })
        }
        type="button"
      >
        Add another field
      </button>
    </form>
  );
}
