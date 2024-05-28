import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default function DetailsHeading(props: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        `my-3 bg-gradient-to-r from-blue-700 from-40%  to-transparent px-4 py-2 text-4xl text-white`,
        props.className
      )}
      {...props}
    >
      {props.children}
    </h4>
  );
}
