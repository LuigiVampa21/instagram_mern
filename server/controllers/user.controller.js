import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { eliminateDuplicate } from "../utils/query/duplicate.js";


export const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("please provide an id");
    }
    const user = await User.findById(id);
    if (!user) {
        throw new Error("no user found with that id");
    }
    res.status(StatusCodes.OK).json({
        user
    })
}

export const getUserFriends = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("please provide an id");
    }
    const user = await User.findById(id).populate('friends');
    if (!user) {
        throw new Error("no user found with that id");
    }
    res.status(StatusCodes.OK).json({
        count: user.friends.length,
        friends: user.friends
    })
}

export const updateUserRelationship = async (req, res) => {
    const { id, friendID } = req.params;
    if (!id || !friendID) {
        throw new Error("Please provide ids");
    }
    const currentUser = await User.findById(id);
    const userFromRelationship = await User.findById(friendID);
    if (!currentUser || !userFromRelationship) {
        throw new Error("User not found");
    }
    const friendsArray = [...currentUser.friends];
    const alreadyFriends = friendsArray.some(friend => String(friend._id) == friendID);

    if (!alreadyFriends) {
        // add friend
        currentUser.friends.push(friendID);
    }
    if (alreadyFriends) {
        // remove friend
        const index = currentUser.friends.findIndex(friend => String(friend._id) == friendID);
        currentUser.friends.splice(index, 1);
    }
    await currentUser.save();

    const user = await User.findById(id).populate('friends');

    res.status(StatusCodes.OK).json({
        count: user.friends.length,
        friends: user.friends
    })
}

export const getSearchUserList = async(req,res) => {
    const { value } = req.body;
    const _queries = value.split(' ');
    let users = [];
    
    const queries = [..._queries].filter(query => query !== '');
    const queryLength = queries.length;
    if(queryLength === 1){
        const name = value.trim();
        const nameRegex = new RegExp(name, 'i');
        const nameFilter = { $or: [ { firstName: nameRegex }, { lastName: nameRegex } ] };
        users = await User.find(nameFilter);
    }else{
        let _usersFilled = [];
        for(const query of queries){
            const nameRegex = new RegExp(query, 'i');
            const nameFilter = { $or: [ { firstName: nameRegex }, { lastName: nameRegex } ] };
            const _users = await User.find(nameFilter);
            _usersFilled = [...users, ..._users];
        }
        users = eliminateDuplicate(_usersFilled);
    }

    res.status(StatusCodes.OK).json({
        count: users.length,
        users,
        queries,
        queryLength
    })
}