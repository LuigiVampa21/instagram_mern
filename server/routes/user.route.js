import express from 'express';
import { getUserById, getUserFriends, updateUserRelationship } from '../controllers/user.controller.js';

const router = express.Router();


router.route('/:id').get(getUserById);
router.route('/:id/friends').get(getUserFriends);
router.route('/:id/friendID').patch(updateUserRelationship);

export default router;