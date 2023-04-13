import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const checkToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(' ')[1];
        if(!token){
            throw new Error("Sorry no token found");
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if(!payload){
            throw new Error("Token not valid or expired");
        }
        req.user = payload;
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: err.message
        })
    }
}