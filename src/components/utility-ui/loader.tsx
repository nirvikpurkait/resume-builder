import { cn } from "@/lib/shadcn-ui/utils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Loader() {
  return (
    <div className={cn(`animate-spin duration-1000`)}>
      <FontAwesomeIcon
        className={cn(`text-6xl`)}
        icon={faSpinner}
        // spinPulse
      />
    </div>
  );
}
