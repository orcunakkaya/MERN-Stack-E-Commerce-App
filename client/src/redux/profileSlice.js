import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk('getProfile', async (token) => {
    const profile = await axios.post(`${process.env.REACT_APP_API}/auth/profile`, {
        message: "post"
    },{
        headers: {
            "authorization": JSON.parse(localStorage.getItem('accessToken'))
        }
    }).then(res => res.data)
    return profile;
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: [],
        loading: false
    },
    extraReducers: {
        [getProfile.pending]: (state) => {
            state.loading = true;
        },
        [getProfile.fulfilled]: (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        [getProfile.rejected]: (state) => {
            state.loading = false;
        }
    }
})

export default profileSlice.reducer;