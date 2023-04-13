
import { StatusCodes } from "http-status-codes";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("please provide an id");
    }
    const post = await Post.findById(id);
    if (!post) {
        throw new Error("no post found with that id");
    }
    res.status(StatusCodes.OK).json({
        post
    })
}

export const getCurrentUserPosts = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new Error("This user does not exists");
    }
    const posts = await Post.find({ user });
    res.status(StatusCodes.OK).json({
        posts,
        count: posts.length
    });

}

export const createPost = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new Error("This user does not exists");
    }

    const {
        location,
        description,
        picturePath,
        // userPicturePath,
    } = req.body;
    // verifs 

    const newPost = new Post({
        user,
        location,
        description,
        picturePath,
        // userPicturePath,
        // comments
    })

    const savedPost = await newPost.save();
    res.status(StatusCodes.CREATED).json(savedPost);
}

export const getFeedPosts = async (req, res) => {
    // const feedPosts = [];
    // const feedPosts = await Post.find().populate('user', {_id: 1, firstName: 1, lastName: 1, picturePath: 1});
    // const feedPosts = await Post.find().populate('user comments');
    // const feedPosts = await Post.find().populate([{path: 'user',  select: ['_id', 'firstName', 'lastName', 'picturePath']}, {path: 'comments', select: ['_id', 'content', 'user']}]);
    const feedPosts = await Post.find().populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user',
            model: 'User'
        }
    });
    return res.status(StatusCodes.OK).json({
        feedPosts
    })
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("please provide an id");
    }
    const post = await Post.findById(id);
    if (!post) {
        throw new Error("no post found with that id");
    }
    const { userID } = req.body;
    const likes = post.likes;
    const alreadyLiked = likes.some(like => like === userID);
    let newLikes;
    if (!alreadyLiked) {
        newLikes = [...likes, userID]
    }
    if (alreadyLiked) {
        newLikes = likes.filter(like => like !== userID)
    }
    const newPost = await Post.findByIdAndUpdate(id,
        {
            likes: newLikes
        },
        {
            new: true
        }
    )

    return res.status(StatusCodes.OK).json({
        message: "ok",
        newPost
    })
}