import express from "express";
import { getAllComments, getPostComments, getComment, postComment, likeComment, updateComment, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.route('/').get(getAllComments);
router.route('/post/:id').get(getPostComments);
router.route('/:id').get(getComment).post(postComment).patch(updateComment).delete(deleteComment);
router.route('/:id/like').patch(likeComment);

export default router;