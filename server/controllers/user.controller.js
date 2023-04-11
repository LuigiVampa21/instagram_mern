import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";


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

export const getUserFriends = async(req,res) => {
    const { id } = req.params;
    if (!id) {
        throw new Error("please provide an id");
    }
    const user = await User.findById(id).populate('friends');
    if (!user) {
        throw new Error("no user found with that id");
    }
    res.status(StatusCodes.OK).json({
        user: { friends: user.friends }
    })
}

export const updateUserRelationship = async(req,res) => {
    const { id, friendID } = req.params;
    if(!id || friendID){
        throw new Error ("Please provide ids");
    }
    const currentUser = await User.findById(id);   
    const userFromRelationship = await User.findById(friendID);  
    if(!currentUser || !userFromRelationship){
        throw new Error ("User not found");
    }
    const friendsArray = [...currentUser.friends];
    const alreadyFriends = friendsArray.some(friend => friend.id == friendID);
    if(!alreadyFriends){
        // add friend
        currentUser.friends.push(friendID);
    }
    if(alreadyFriends){
        // remove friend
        currentUser.friends.filter(friend => friend.id !== friendID);
    }
    await currentUser.save();
    res.status(StatusCodes.OK).json({
        friends: currentUser.friends
    })
    
}