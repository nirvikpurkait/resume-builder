"use server";

import { revalidateUserDetails } from "@/cache/cachedGetUserDetails";
import { TBasicDetails } from "@/components/resume-form/basic-details";
import { prisma } from "@/database";
import { id } from "@/utils/id";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type TUpdationResult = {
  status: "success" | "error";
  message?: string;
};

export async function updateBasicInfo(data: TBasicDetails) {
  const { dateOfBirth } = data;
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    const res: TUpdationResult = {
      status: "error",
      message: "No user found, please login again",
    };
    return res;
  }

  await prisma.resumeDetails.upsert({
    create: {
      id: id(),
      ...data,
      userId: userId,
      dateOfBirth: new Date(dateOfBirth),
    },
    update: {
      ...data,
      dateOfBirth: new Date(dateOfBirth),
    },
    where: {
      userId: userId,
    },
  });

  revalidateTag(revalidateUserDetails);

  const res: TUpdationResult = {
    status: "success",
  };
  return res;
}
