import { uid } from "uid";

export const id = (length: number = 24) => {
	return uid(length);
};
