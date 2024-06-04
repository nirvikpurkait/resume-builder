"use client";

import { getBasicInfo } from "@/app/api/server-actions/get-basic-info.sa";
import { updateBasicInfo } from "@/app/api/server-actions/save-basic-info.sa";
import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        `m-auto mt-8 w-full max-w-[35rem] space-y-4 rounded-md border-2 border-solid border-blue-500 px-8 py-8 text-lg dark:border-0 dark:bg-white dark:text-black`
      )}
    >
      <div className={cn(`flex gap-4`)}>
        <label htmlFor="career-objective" className={cn(`w-[30%]`)}>
          Career Objective:
        </label>
        <textarea
          id="career-objective"
          {...register("careerObjective")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        ></textarea>
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="address" className={cn(`w-[30%]`)}>
          Address:
        </label>
        <input
          type="text"
          id="address"
          {...register("address")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="dob" className={cn(`w-[30%]`)}>
          Date of birth:
        </label>
        <input
          type="date"
          id="dob"
          {...register("dateOfBirth")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="linkedin" className={cn(`w-[30%]`)}>
          Linkedin:
        </label>
        <input
          type="text"
          id="linkedin"
          {...register("linkedIn")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="github" className={cn(`w-[30%]`)}>
          GitHub:
        </label>
        <input
          type="text"
          id="github"
          {...register("github")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="email" className={cn(`w-[30%]`)}>
          Email:
        </label>
        <input
          type="text"
          id="email"
          {...register("email")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <label htmlFor="phone" className={cn(`w-[30%]`)}>
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          className={cn(`w-[70%] rounded-md border-2 border-blue-500`)}
        />
      </div>

      <div className={cn(`ml-auto flex`)}>
        <button
          type="submit"
          className={cn(`ml-auto rounded-md bg-blue-500 px-4 py-2 text-white`)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
