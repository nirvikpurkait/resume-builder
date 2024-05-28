import React from "react";
import DetailsHeading from "./details-heading";
import { cn } from "@/lib/shadcn-ui/utils";

export default function CareerObjective({
  careerObjective,
}: {
  careerObjective: string;
}) {
  return (
    <div>
      <DetailsHeading>Career objective</DetailsHeading>
      <div className={cn(`w-3/4 text-xl`)}>{careerObjective}</div>
    </div>
  );
}
