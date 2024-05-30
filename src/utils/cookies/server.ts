import { cookies } from "next/headers";

export function getCookie(cookieName: string) {
  const cookieStore = cookies();

  const cookieValue = cookieStore.get(cookieName)?.value;

  if (!cookieValue) return null;

  return cookieValue;
}
