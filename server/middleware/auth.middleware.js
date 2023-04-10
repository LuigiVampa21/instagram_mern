import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const checkToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if(!token){
            throw new Error("Sorry no token found");
        }
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        if(!isValid){
            throw new Error("Token not valid or expired");
        }
        req.user = isValid;
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: err.message
        })
    }
}