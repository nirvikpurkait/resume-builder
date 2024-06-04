"use client";

import { cn } from "@/lib/shadcn-ui/utils";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function AddNewEntry(props: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={cn(
        `aspect-square w-16 rounded-full bg-blue-700 text-3xl text-white`,
        props.className
      )}
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}
