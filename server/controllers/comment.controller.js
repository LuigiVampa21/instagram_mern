import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Like from '../models/Like.js';
import Post from '../models/Post.js';
import { StatusCodes } from 'http-status-codes';

export const getPostComments = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error('no post found')
    }
    const post = await Post.findById(id).populate('comments');
    if (!post) {
        throw new Error('no post found')
    }
    const { comments } = post;
    res.status(StatusCodes.OK).json({
        results: comments.length,
        comments
    })

}
export const getAllComments = async (req, res) => {
    const comments = await Comment.find();

    res.status(StatusCodes.OK).json({
        count: comments.length,
        comments
    })
}

export const getComment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error('no post found')
    }
    const comment = await Comment.findById(id).populate('comments');
    if (!comment) {
        throw new Error('no comment found')
    }
    res.status(StatusCodes.OK).json({
        comment
    })
}

export const postComment = async (req, res) => {
    const { id: postID } = req.params;
    if (!postID) {
        throw new Error('no post found')
    }
    const { userID, content } = req.body;
    if (!userID || !content) {
        throw new Error('no user or content')
    }
    const _post = await Post.findById(postID);
    if (!_post) {
        throw new Error('no post found')
    }
    const user = await User.findById(userID);
    if (!user) {
        throw new Error('no user found')
    }

    // For production
    // if (user.id !== req.user.id) {
    //     throw new Error('Can not create comment for this user')
    // }

    const comment = await Comment.create({
        user,
        post: _post._id,
        content
    })
    _post.comments.push(comment);

    await _post.save();

    res.status(StatusCodes.OK).json({
        _post
    })
}

export const likeComment = async (req, res) => {

}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content, userID } = req.body;
    if (!id) {
        throw new Error('no comment found')
    }
    const comment = await Comment.findByIdAndUpdate(id, {
        content
    });
    if (!comment) {
        throw new Error('no comment found')
    }
    const post = await Post.findById(comment.post._id);

    // For production
    // if (userID !== req.user.id) {
    //     throw new Error('Can not update comment for this user')
    // }


    // const postID = comment.post._id;
    // const post = await Post.findById(postID);
    // const newPostComments  = [...post.comments].filter(comment => String(comment._id) !== id);
    // await post.updateOne({
    //     comments: [...newPostComments]
    // })
    // await post.save();

    res.status(200).json({
        comment,
        post
    })
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error('no comment found')
    }
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error('no comment found')
    }
    await Comment.findByIdAndDelete(id)
    const postID = comment.post._id;
    const post = await Post.findById(postID);
    const newPostComments = [...post.comments].filter(comment => String(comment._id) !== id);
    await post.updateOne({
        comments: [...newPostComments]
    })
    await post.save();

    res.status(200).json({
        newPostComments
    })
}
