function suffixAfterDate(day: number) {
  if (day > 3 && day < 21) return "th"; // For 4th-20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatDateWithSuffix(date: Date) {
  date = new Date(date);

  const dayFormatter = new Intl.DateTimeFormat("en", { day: "numeric" });
  const monthFormatter = new Intl.DateTimeFormat("en", { month: "long" });
  const yearFormatter = new Intl.DateTimeFormat("en", { year: "numeric" });

  const day = dayFormatter.format(date);
  const month = monthFormatter.format(date);
  const year = yearFormatter.format(date);

  return `${day}${suffixAfterDate(Number(day))} ${month} ${year}`;
}
