import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default function ToastClosingButton(
  props: React.ComponentProps<"button">
) {
  return (
    <button
      className={cn(`border-l border-gray-500 px-4`, props.className)}
      {...props}
      type="button"
    >
      Close
    </button>
  );
}
