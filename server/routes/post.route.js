import express from "express";
import { getFeedPosts, createPost, getPost, likePost, getCurrentUserPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.route('/').get(getFeedPosts);
router.route('/:id').get(getPost).post(createPost);
router.route('/:id/user').get(getCurrentUserPosts);
router.route('/:id/like').patch(likePost);

export default router;