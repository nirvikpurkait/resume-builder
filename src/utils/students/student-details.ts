import { prisma } from "@/database";

export function getUserDetails(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
      role: "STUDENT",
    },
    select: {
      resumeDetails: {
        include: {
          educations: true,
          projects: true,
          skills: true,
          workExperiences: true,
        },
      },
      id: true,
      name: true,
      role: true,
      username: true,
      profilePicture: true,
    },
  });
}
