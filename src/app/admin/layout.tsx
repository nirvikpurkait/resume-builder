import { getCookie } from "@/utils/cookies/server";
import { redirect } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = getCookie("role");

  if (!role || role !== "ADMIN") redirect("/");

  return <>{children}</>;
}
