import mongoose from 'mongoose';


export const connectDB = url => {
    return mongoose
      .connect(url)
      .then(console.log("Database connected"))
      .catch(err => console.error(err));
  };