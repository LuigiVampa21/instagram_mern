// PACKAGES
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
// import multer from 'multer';

// MIDDLEWARES
import { checkToken } from './middleware/auth.middleware.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { notFound } from './middleware/not-found.middleware.js';
import { uploadPicture } from './utils/multer/multer.js';

// TEST
// import User from './models/User.js';
// import Post from './models/Post.js';
// import {users, posts} from './data/index.js';

// FUNCTIONS
import { connectDB } from './utils/db/connectDB.js';

// ROUTES
import authRouter from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import postRoute from './routes/post.route.js';
import commentRoute from './routes/comment.route.js';

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(uploadPicture.any());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(morgan("dev"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// ROUTES
app.get('/', (req, res) => {
    res.send("Welcome to the instagram API v1 !")
});

app.use('/api/v1/instagram/auth', authRouter);

app.use(checkToken);
app.use('/api/v1/instagram/users', userRoute);
app.use('/api/v1/instagram/posts', postRoute);
app.use('/api/v1/instagram/comments', commentRoute);

// ERROR ROUTES
app.use(errorHandler);
app.use(notFound);



const PORT = process.env.PORT || 4040;

(async() => {
    try{
    await connectDB(process.env.DB_URI);
    // await User.insertMany(users);
    // await Post.insertMany(posts);
    app.listen(PORT, () => {
        console.log("Server connected");
    })
    }catch(err){
        console.log(err);
    }
})();