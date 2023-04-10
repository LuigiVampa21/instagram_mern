import bcrypt from "bcrypt";

export const isMatch = async (candidate, password) => {
    return bcrypt.compare(candidate, password);
}
