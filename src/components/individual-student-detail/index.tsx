import React from "react";
import Name from "./name";
import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import Username from "./username";
import ResumeDetails from "./resume-details";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { nameInitials } from "@/utils/name-initials";
import Contacts from "./contacts";
import { cn } from "@/lib/shadcn-ui/utils";

export default async function StudentDetails({
  studentId,
}: {
  studentId: string;
}) {
  const studentDetails = await cachedGetUserDetails(studentId);
  if (studentDetails === null) return <></>;

  return (
    <div className={cn(`mt-16`)}>
      <div className={cn(`flex items-center gap-6`)}>
        <UserAvatar
          profilePicture={studentDetails.profilePicture}
          name={studentDetails.name}
        />
        <div className={cn(`w-full`)}>
          <Name name={studentDetails.name} />
          <Username username={studentDetails.username} />
          <Contacts data={studentDetails.resumeDetails} />
        </div>
      </div>

      <ResumeDetails studentId={studentId} />
    </div>
  );
}

function UserAvatar({
  profilePicture,
  name,
}: {
  profilePicture: string | null;
  name: string;
}) {
  return (
    <Avatar>
      {profilePicture && (
        <AvatarImage src={profilePicture} alt="profile-picture" />
      )}
      <AvatarFallback>{nameInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
