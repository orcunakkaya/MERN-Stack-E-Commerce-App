import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('getProducts', async (param) => {
    const products = await axios.get(`${process.env.REACT_APP_API}/product/products/${param.replace(/_/g, " ")}`)
        .then(res => res.data)
    
    return products;
})

export const getSingleProduct = createAsyncThunk('getSingleProduct', async (id) => {
    const product = await axios.get(`${process.env.REACT_APP_API}/product/${id}`)
        .then(res => res.data);
    return product[0]
})

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        product: null,
        dowloading: false
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.dowloading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.dowloading = false;
        },
        [getProducts.rejected]: (action) => {
            console.log("err: ", action.error);
        },
        [getSingleProduct.pending]: (state) => {
            state.dowloading = true;
        },
        [getSingleProduct.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.dowloading = false;
        },
        [getSingleProduct.rejected]: (action) => {
            console.log("err: ", action.error);
        }
    }
})

export default productSlice.reducer;