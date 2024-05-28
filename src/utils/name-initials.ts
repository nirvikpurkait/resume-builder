export function nameInitials(name: string, upto: number = 2) {
  return name
    .split(" ")
    .map((splitedName) => {
      return splitedName[0];
    })
    .join("")
    .slice(0, upto);
}
