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
    friends,
    location,
    occupation,
  } = req.body;

  let picturePath = "default.jpg";
  
  if(req.file){
    const file = req.files[0];
    picturePath = file.filename
  }

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
  const _user = await User.findOne({ email }).select('+password');
  if (!_user) {
    throw new Error("This user does not exists");
  }
  const match = await isMatch(password, _user.password);
  if (!match) {
    throw new Error("This password does not match");
  }

  const token = generateToken({ id: _user.id, email: _user.email });

  const user = {
    _id: _user.id,
    firstName: _user.firstName,
    lastName: _user.lastName,
    email: _user.email,
    picturePath: _user.picturePath,
    friends: _user.friends,
    location: _user.location,
    occupation: _user.occupation,
    viewedProfile: _user.viewedProfile,
    impressions: _user.impressions,
  }

  res.status(StatusCodes.OK).json({
    token,
    user
  });
}