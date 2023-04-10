import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/auth/hashPassword.js';
import { isMatch } from '../utils/auth/passwordMatch.js';
import { generateToken } from '../utils/auth/generateToken.js';

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 1000),
    impressions: Math.floor(Math.random() * 1000),
  })
  const savedUser = await newUser.save();
  res.status(StatusCodes.CREATED).json(savedUser);
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("This user does not exists");
  }
  const match = await isMatch(password, user.password);
  if (!match) {
    throw new Error("This password does not match");
  }

  const token = generateToken({ id: user.id, email: user.email });

  res.status(StatusCodes.OK).json({
    token,
    user: {
      id: user.id,
      email: user.email
    }
  });
}