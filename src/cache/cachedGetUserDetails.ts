import { getUserDetails } from "@/utils/students/student-details";
import { unstable_cache as cache } from "next/cache";

export const revalidateUserDetails = "revalidate-user-details";

export const cachedGetUserDetails = cache(
  async (userId: string) => getUserDetails(userId),
  [revalidateUserDetails]
);
