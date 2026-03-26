import { hash, compare } from "bcrypt";

export const hashValue = async (password: string): Promise<string> => {
  return hash(password, 10);
};

export const compareValue = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
