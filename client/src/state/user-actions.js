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
            const { data } = response;
            const { friends } = data;
            console.log(friends);
            dispatch(setFriends({ friends }))
        } catch (err) {
            console.log(err);
        }
    }
}

export const _patchFriend = (id, friendID, token) => {
    return async dispatch => {
        try {
            const response = await axios.patch(process.env.REACT_APP_BASE_URL + '/users/' + id + '/' + friendID, {}, headersConfig(token));
            const { data } = response;
            const { friends } = data;
            dispatch(setFriends({ friends }))
        } catch (err) {
            console.log(err);
        }
    }
}