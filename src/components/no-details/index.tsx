import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

export default function NoDetails() {
  return (
    <div
      className={cn(
        `mt-10 flex flex-col items-center justify-center space-y-8`
      )}
    >
      <h2
        className={cn(
          `mb-6 text-center text-8xl text-blue-500 dark:text-white`
        )}
      >
        Uh-uh...........
      </h2>
      <h3 className={cn(`text-center text-4xl`)}>
        No details found for the given id
      </h3>
      <div className={cn(`text-2xl`)}>
        <div>This (may) happend because:</div>
        <ul className={cn(`list-disc`)}>
          <li className={cn(`ml-8`)}>Given id belongs to admin.</li>
          <li className={cn(`ml-8`)}>No user is registered with this id.</li>
        </ul>
      </div>
      <div className={cn(`text-2xl`)}>Try searching for a valid user-id</div>
    </div>
  );
}
