import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { uploadPicture } from '../utils/multer/multer.js';

const router = express.Router();

router.route('/register').post((req,res) => {
    uploadPicture.single('picture');
    // next();
    register(req,res);
} 
);
router.route('/login').post(login);

export default router;
