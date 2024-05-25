"use client";

import { login } from "@/app/api/server-actions/login.sa";
import { Button } from "@/components/login-form/button";
import { Input } from "@/components/login-form/input";
import { cn } from "@/lib/shadcn-ui/utils";
import React, { ChangeEvent, FormEvent, useState } from "react";

export type TLoginFormData = {
  username: string;
  password: string;
  role: string;
};

export default function LoginForm() {
  const [formDetails, setFormDetails] = useState<TLoginFormData>({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, role, username } = formDetails;

    if (username.length === 0) return;
    if (password.length === 0) return;
    if (role === "") return;

    await login(formDetails);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        `m-auto flex w-full max-w-[30rem] flex-col gap-4 rounded-lg bg-blue-600/15 p-8 `
      )}
    >
      <div className={cn(`flex gap-4`)}>
        <Label htmlFor="username">Username:</Label>
        <Input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={formDetails.username}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formDetails.password}
        />
      </div>

      <div className={cn(`flex gap-4`)}>
        <Label htmlFor="role">Role:</Label>
        <select
          name="role"
          id="role"
          value={formDetails.role}
          onChange={handleChange}
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
        <Button type="submit" className={cn(`bg-blue-700 text-lg`)}>
          Login
        </Button>
      </div>
    </form>
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn(`basis-32 text-lg`, className)} {...props}>
      {props.children}
    </label>
  );
}
