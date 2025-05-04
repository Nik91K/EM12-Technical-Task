import { configureStore } from '@reduxjs/toolkit';
import typeSlice from './slices/typeSlice';
import categorySlice from './slices/categorySlice';
import authSlice from './slices/authSlice';
import transactionSlice from './slices/transactionSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        category: categorySlice,
        type: typeSlice,
        transaction: transactionSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
