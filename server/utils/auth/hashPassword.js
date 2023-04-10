import bcrypt from "bcrypt";

export const hashPassword = async password => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}