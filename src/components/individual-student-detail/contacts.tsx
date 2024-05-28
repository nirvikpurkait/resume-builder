import { prisma } from "@/database";
import { cn } from "@/lib/shadcn-ui/utils";
import { formatDateWithSuffix } from "@/utils/date";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMobile,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

type ContactsProps = Awaited<
  ReturnType<typeof prisma.resumeDetails.findUnique>
>;

export default function Contacts({ data }: { data: ContactsProps }) {
  if (!data) return null;
  else {
    return (
      <div className={cn(`grid grid-cols-2 gap-y-2 text-xl`)}>
        <a
          className={cn(`flex items-center gap-3`)}
          target="_blank"
          href={data.github}
        >
          <FontAwesomeIcon icon={faGithub} className={cn(`h-6`)} />
          {data.github}
        </a>
        <a
          className={cn(`flex items-center gap-3`)}
          target="_blank"
          href={data.linkedIn}
        >
          <FontAwesomeIcon icon={faLinkedin} className={cn(`h-6`)} />
          {data.linkedIn}
        </a>
        <a
          className={cn(`flex items-center gap-3`)}
          target="_blank"
          href={`tel:${data.phone}`}
        >
          <FontAwesomeIcon icon={faMobile} className={cn(`h-6`)} />
          {data.phone}
        </a>
        <a
          className={cn(`flex items-center gap-3`)}
          target="_blank"
          href={`mailto:${data.email}`}
        >
          <FontAwesomeIcon icon={faEnvelope} className={cn(`h-6`)} />
          {data.email}
        </a>
        <span className={cn(`flex items-center gap-3`)}>
          <FontAwesomeIcon icon={faLocationDot} className={cn(`h-6`)} />
          {data.address}
        </span>
        <span className={cn(`flex items-center gap-3`)}>
          <FontAwesomeIcon icon={faCalendarDays} className={cn(`h-6`)} />
          {formatDateWithSuffix(data.dateOfBirth)}
        </span>
      </div>
    );
  }
}
