import { getUserDetails } from "@/utils/students/student-details";
import { unstable_cache as cache } from "next/cache";

/**
 * variable name for revalidating key to reduce typos.
 */
export const revalidateUserDetails = "revalidate-user-details";
export const revalidate_user_details = "revalidate-user-details";

/**
 * function to get user details and cache the data to use
 * through out the application.
 */
export const cachedGetUserDetails = cache(
  async (userId: string) => getUserDetails(userId),
  [revalidateUserDetails]
);
