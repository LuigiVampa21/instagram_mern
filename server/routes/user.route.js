import express from 'express';
import { getUserById, getUserFriends, updateUserRelationship, getSearchUserList } from '../controllers/user.controller.js';

const router = express.Router();


router.route('/search').get(getSearchUserList)
router.route('/:id').get(getUserById);
router.route('/:id/friends').get(getUserFriends);
router.route('/:id/:friendID').patch(updateUserRelationship);

export default router;