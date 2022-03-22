import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import profileSlice from "./profileSlice";

export default configureStore({
    reducer: {
        product: productSlice,
        auth: authSlice,
        profile: profileSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})