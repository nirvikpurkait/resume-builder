"use server";

import { TLoginFormData } from "@/components/login-form/login-form";
import { prisma } from "@/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type TLoginActionResponse = {
  status: "success" | "error";
  message?: string;
};

export const login = async (
  formData: TLoginFormData
): Promise<TLoginActionResponse> => {
  // ! intentional delay generator, comment on production
  // await new Promise((res) => setTimeout(res, 3000));
  // ! intentional delay generator, comment on production

  const user = await prisma.user.findUnique({
    where: { username: formData.username },
  });

  if (!user) {
    return {
      status: "error",
      message: "No user found with this username",
    };
  }

  if (user.role !== formData.role) {
    return {
      status: "error",
      message: "Please select the correct role",
    };
  }

  if (user.password !== formData.password) {
    return {
      status: "error",
      message: "Wrong password",
    };
  }

  cookies().set("role", user.role);
  cookies().set("username", user.username);
  cookies().set("userId", user.id);

  if (user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/student");
  }
};
