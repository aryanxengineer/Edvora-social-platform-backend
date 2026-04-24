import { hash, compare } from "bcrypt";
export const hashValue = async (password) => {
    return hash(password, 10);
};
export const compareValue = async (password, hashedPassword) => {
    return compare(password, hashedPassword);
};
//# sourceMappingURL=bcrypt.js.map