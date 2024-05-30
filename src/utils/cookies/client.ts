export function getCookie(cookieName: string) {
  const cookiesList = document.cookie;

  const cookiesAsArray = cookiesList.split("; ");

  for (const cookie of cookiesAsArray) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) return value;
  }

  return null;
}
