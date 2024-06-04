"use client";

import { cn } from "@/lib/shadcn-ui/utils";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DownloadButton(props: React.ComponentProps<"button">) {
  const download = () => {
    const a = document.createElement("a");
    a.href = "/api/download-pdf/resume";
    a.click();
  };

  return (
    <button
      {...props}
      onClick={download}
      className={cn(
        `aspect-square w-16 rounded-full bg-blue-700 text-3xl text-white`,
        props.className
      )}
    >
      <FontAwesomeIcon icon={faArrowDown} />
    </button>
  );
}
