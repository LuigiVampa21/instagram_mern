import jwt from "jsonwebtoken";

export const generateToken = obj => {
    return jwt.sign(obj, process.env.JWT_SECRET);
}