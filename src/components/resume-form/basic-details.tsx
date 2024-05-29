"use client";

import { getBasicInfo } from "@/app/api/server-actions/get-basic-info.sa";
import { updateBasicInfo } from "@/app/api/server-actions/save-basic-info.sa";
import { prisma } from "@/database";
import React from "react";
import { useForm } from "react-hook-form";

export type TBasicDetails = Omit<
  NonNullable<Awaited<ReturnType<typeof prisma.resumeDetails.findFirst>>>,
  "id" | "userId"
>;

export default function BasicDetails() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<TBasicDetails>({
    defaultValues: async () => getBasicInfo(),
  });

  const onSubmit = async (data: TBasicDetails) => {
    await updateBasicInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="career-objective">Career Objective:</label>
        <textarea
          id="career-objective"
          {...register("careerObjective")}
        ></textarea>
      </div>

      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" {...register("address")} />
      </div>

      <div>
        <label htmlFor="dob">Date of birth:</label>
        <input type="date" id="dob" {...register("dateOfBirth")} />
      </div>

      <div>
        <label htmlFor="linkedin">Linkedin:</label>
        <input type="text" id="linkedin" {...register("linkedIn")} />
      </div>

      <div>
        <label htmlFor="github">GitHub:</label>
        <input type="text" id="github" {...register("github")} />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" {...register("email")} />
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" {...register("phone")} />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
