import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * function to [merge](https://www.npmjs.com/package/tailwind-merge) different [types](https://www.npmjs.com/package/clsx) of class values to use
 * with `className` prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
