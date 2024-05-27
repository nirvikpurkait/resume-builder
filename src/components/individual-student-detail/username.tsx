import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default function Username({ username }: { username: string }) {
  return <div className={cn(`text-xl`)}>{username}</div>;
}
