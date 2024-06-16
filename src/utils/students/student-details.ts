import { prisma } from "@/database";

export function getUserDetails(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
      role: "STUDENT",
    },
    select: {
      id: true,
      name: true,
      profilePicture: true,
      resumeDetails: true,
      projects: true,
      skills: true,
      role: true,
      username: true,
      workExperiences: {
        orderBy: {
          startDate: "desc",
        },
      },
      educations: {
        orderBy: {
          endDate: "asc",
        },
      },
    },
  });
}
