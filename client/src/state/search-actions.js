import axios from "axios";
import { headersConfig } from "utils/headers";
import { setSearchArray } from './index';


export const getUserList = (value, token) => {
    return async dispatch => {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + '/users/search', {
                value
            }, headersConfig(token));
            const { data } = response;
            const {users} = data;
            dispatch(setSearchArray({users}))
        } catch (err) {
            console.log(err);
        }
    }
}