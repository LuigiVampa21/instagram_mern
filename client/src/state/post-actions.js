import axios from 'axios';
import { setPost, setPosts } from './index';

const headersConfig = token => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const sendPost = (id, post, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/posts/' + id, post, headersConfig(token));
            const { data: newPost } = response;
            // console.log(newPost);
            dispatch(setPost({ post: newPost }));
        } catch (err) {
            console.log(err);
        }
    }
}

export const _patchLike = (id, userID, token) => {
    return async dispatch => {
        try {
            const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/posts/' + id + '/like', { userID }, headersConfig(token))
            const { data: updatedPost } = response;
            console.log(updatedPost);
            dispatch(setPost({ post: updatedPost }))
        } catch (err) {
            console.log(err);
        }
    }
} 

export const getFeedPosts = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/posts', headersConfig(token))
            const { data } = response;
            const { feedPosts } = data;
            const posts = [...feedPosts];
            dispatch(setPosts({ posts }))
        } catch (err) {
            console.log(err);
        }
    }
}

export const _getUserPosts = (id, token) => {
    return async dispatch => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL + '/posts/' + id + '/user', headersConfig(token))
            const { data: userPosts } = response;
            console.log(userPosts);
            dispatch(setPosts({ posts: userPosts }))
        } catch (err) {
            console.log(err);
        }
    }
}
