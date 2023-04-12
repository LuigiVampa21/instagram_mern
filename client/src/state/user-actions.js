import axios from 'axios';

import { setFriends } from 'state';

const headersConfig = token => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}


export const getUserFriends = (id, token) => {
    return async dispatch => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/users/' + id + '/friends', headersConfig(token));
            const { data: friends } = response;
            console.log(friends);
            // dispatch(setPost({ post: newPost }));
        } catch (err) {
            console.log(err);
        }
    }
}

export const patchFriend = (id, post, token) => {
    return async dispatch => {
        try {
            // const response = await axios.post(process.env.REACT_APP_BASE_URL + '/posts/' + id, post, headersConfig(token));
            // const { data: newPost } = response;
            // console.log(newPost);
            // dispatch(setPost({ post: newPost }));
        } catch (err) {
            console.log(err);
        }
    }
}