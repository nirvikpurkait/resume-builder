export function nameInitials(name: string) {
  return name
    .split(" ")
    .map((splitedName) => {
      return splitedName[0];
    })
    .join("");
}
