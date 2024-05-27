import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default function Name({ name }: { name: string }) {
  return <div className={cn(`text-[3rem]`)}>{name}</div>;
}
