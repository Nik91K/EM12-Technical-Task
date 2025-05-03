import { configureStore } from '@reduxjs/toolkit';
import typeSlice from './slices/typeSlice';
import categorySlice from './slices/categorySlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice,
        type: typeSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
