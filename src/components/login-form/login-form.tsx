"use client";

import { login } from "@/app/api/server-actions/login.sa";
import { Button } from "@/components/login-form/button";
import { Input } from "@/components/login-form/input";
import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { validationRuleOf } from "./login-form.form-validation";
import toast from "react-hot-toast";
import FormToaster from "./form-toaster";
import { isRedirectError } from "next/dist/client/components/redirect";
import Loader from "../utility-ui/loader";

export type TLoginFormData = {
  username: string;
  password: string;
  role: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<TLoginFormData>();

  // create a custom success toast message
  const successToast = (message: string) =>
    toast.custom((toastInfo) => (
      <FormToaster {...toastInfo} toastMessage={message} type="success" />
    ));

  // create a custom error toast message
  const errorToast = (message: string) =>
    toast.custom((toastInfo) => (
      <FormToaster {...toastInfo} toastMessage={message} type="error" />
    ));

  // operation when form is submitting
  const onSubmit = async (formData: TLoginFormData) => {
    try {
      const loginRes = await login(formData);

      if (loginRes.status === "error") {
        errorToast(loginRes.message as string);
      }
    } catch (error) {
      if (isRedirectError(error)) return;
      successToast("Login successfull");
    }
  };

  // when form has an error
  const onError = async (errorValues: FieldErrors<TLoginFormData>) => {
    // render the toast message for every error message if present
    if (errorValues.username?.message) {
      errorToast(errorValues.username.message);
      return;
    }
    if (errorValues.password?.message) {
      errorToast(errorValues.password.message);
      return;
    }
    if (errorValues.role?.message) {
      errorToast(errorValues.role.message);
      return;
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className={cn(
          `relative m-auto flex w-full max-w-[30rem] flex-col gap-4 rounded-lg border-4 border-blue-700/40 p-10 py-20 backdrop-blur-md`
        )}
      >
        <div className={cn(`flex gap-4`)}>
          <Label htmlFor="username">Username:</Label>
          <Input
            id="username"
            type="text"
            {...register("username", validationRuleOf("username"))}
          />
        </div>

        <div className={cn(`flex gap-4`)}>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            {...register("password", validationRuleOf("password"))}
          />
        </div>

        <div className={cn(`flex gap-4`)}>
          <Label htmlFor="role">Role:</Label>
          <select
            id="role"
            defaultValue={""}
            {...register("role", validationRuleOf("role"))}
            className={cn(
              `w-full rounded-md border-[1.5px] border-blue-700 bg-white p-4 py-1 text-center text-lg text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:ring-4 focus-visible:ring-blue-700
            `
            )}
          >
            <option value="" disabled>
              --select role--
            </option>
            <option value="ADMIN">Admin</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <div className={cn(`ml-auto flex gap-4`)}>
          <Button
            type="submit"
            className={cn(
              `bg-blue-700 text-lg transition-all active:scale-x-[98%] active:scale-y-[98%] active:bg-blue-600`
            )}
            // ! uncomment the below line, commented for developmemt purpose
            disabled={isSubmitting}
          >
            Login
          </Button>
        </div>

        <div
          className={cn(
            `absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-4 text-blue-700 backdrop-blur`,
            { hidden: !isSubmitting, flex: isSubmitting }
          )}
        >
          <Loader />
        </div>
      </form>
    </>
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn(`basis-32 text-lg`, className)} {...props}>
      {props.children}
    </label>
  );
}
