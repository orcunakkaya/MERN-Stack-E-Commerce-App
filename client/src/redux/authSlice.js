import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('getUser', async (values) => {
    const user = await axios.post(`${process.env.REACT_APP_API}/auth/signin`, values)
        .then(res => res.data);

    return user;
})

export const createUser = createAsyncThunk('createUser', async (user) => {
    const newUser = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, user)
        .then(res => res.data);
    return newUser;
})

export const isUserAuth = createAsyncThunk('isUserAuth', async () => {
    const isLoggedIn = await fetch(`${process.env.REACT_APP_API}/auth/isUserAuth`, {
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('accessToken'))
            }
        })
            .then(res => res.json())
            .then(data => data.isLoggedIn === true ? true : false)
    
    return isLoggedIn
})

const accessToken = localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: [],
        isUser: null,
        loading: false,
        isLoggedIn: false,
        token: accessToken || null,
    },
    reducers: {
        logOut: (state) => {
            state.user = [];
            state.token = null;
        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.loading = true
        },
        [createUser.fulfilled]: (state, action) => {
                state.isUser = false;
                state.user = action.payload.user;
                localStorage.setItem('accessToken', JSON.stringify(action.payload.token));
                state.token = action.payload.token;
                state.loading = false;
        },
        [createUser.rejected]: (state) => {
            state.loading = false;
            state.isUser = true;
        },
        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.loading = false;
            state.isUser = true;
            state.token = action.payload.token;
            localStorage.setItem('accessToken', JSON.stringify(action.payload.token));
        },
        [getUser.rejected]: (state) => {
            state.isUser = false;
            state.loading = false;
        },
        [isUserAuth.fulfilled]: (state, action) => {
            if(action.payload === true){
                state.isLoggedIn = true
            }else{
                state.isLoggedIn = false
            }
        },
        [isUserAuth.rejected]: (state) => {
            state.isLoggedIn = false
        },
    }
})

export const { logOut } = authSlice.actions;

export default authSlice.reducer;