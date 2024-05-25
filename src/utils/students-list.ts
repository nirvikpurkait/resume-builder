import { prisma } from "@/database";

export const getAllStudents = async () => {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    select: {
      id: true,
      name: true,
      role: true,
      username: true,
    },
  });

  return students;
};
