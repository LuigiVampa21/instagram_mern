import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
    searchArray: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map(post => {
                if(post._id === action.payload.post_id) return action.payload.post;
                return post;
            })
            state.posts = updatedPost;
            // state.posts = [action.payload.post, ...state.posts]
        },
        setSearchArray: (state, action) => {
            // const _searchArray = action.payload.users;
            console.log(action.payload.users);
            state.searchArray = [...action.payload.users];
            console.log(state.searchArray);
        }
    }
})

export const { setMode, setFriends, setLogin, setPost, setPosts, setLogout, setSearchArray } = authSlice.actions;
export default authSlice.reducer;