// PACKAGE & MIDDLEWARES
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// FUNCTIONS
import { connectDB } from './utils/db/connectDB.js';


// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));



const PORT = process.env.PORT || 4040;

(async() => {
    try{
    await connectDB(process.env.DB_URI);
    app.listen(PORT, () => {
        console.log("Server connected");
    })
    }catch(err){
        console.log(err);
    }
})();