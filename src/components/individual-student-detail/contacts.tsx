import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
import React from "react";

type ContactsProps = Awaited<
  ReturnType<typeof prisma.resumeDetails.findUnique>
>;

export default function Contacts({ data }: { data: ContactsProps }) {
  if (!data) return null;
  else {
    return (
      <div className={cn(`flex gap-8 text-xl`)}>
        <a
          className={cn(`text-blue-500 underline`)}
          target="_blank"
          href={data.github}
        >
          {data.github}
        </a>
        <a
          className={cn(`text-blue-500 underline`)}
          target="_blank"
          href={data.linkedIn}
        >
          {data.linkedIn}
        </a>
        <a
          className={cn(`text-blue-500 underline`)}
          target="_blank"
          href={`tel:${data.phone}`}
        >
          {data.phone}
        </a>
        <a
          className={cn(`text-blue-500 underline`)}
          target="_blank"
          href={`mailto:${data.email}`}
        >
          {data.email}
        </a>
      </div>
    );
  }
}
