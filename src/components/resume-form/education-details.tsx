"use client";

import { getEducationInfo } from "@/app/api/server-actions/get-education-info.sa";
import { saveEducationDetails } from "@/app/api/server-actions/save-education-info.sa";
import { prisma } from "@/database";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export type TEducationDetails = Omit<
  NonNullable<Awaited<ReturnType<typeof prisma.education.findFirst>>>,
  "id" | "resumeDetailsId"
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
  })[];
};

export default function EducationDetails() {
  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: async () => getEducationInfo(),
  });

  const { fields, append, remove } = useFieldArray<FormFields>({
    name: "educationFields",
    control,
  });

  const onSubmit = async (data: FormFields) => {
    saveEducationDetails(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

            <button onClick={() => remove(index)} type="button">
              Delete
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
          })
        }
        type="button"
      >
        Add another field
      </button>
      {/* <div>
        <label htmlFor="institute">Institute name:</label>
        <input type="text" id="institute" />
      </div>

      <div>
        <label htmlFor="course">Course name:</label>
        <input type="text" id="course" />
      </div>

      <div>
        <label htmlFor="marks">Marks:</label>
        <input type="text" id="marks" />
      </div>

      <div>
        <label htmlFor="start-date">Start date:</label>
        <input type="date" id="start-date" />
      </div>

      <div>
        <label htmlFor="end-date">End date:</label>
        <input type="date" id="end-date" />
      </div> */}

      <button type="submit">Save</button>
    </form>
  );
}
