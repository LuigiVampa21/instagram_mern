import bcrypt from "bcrypt";

export const hashPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}