import { configureStore } from '@reduxjs/toolkit';
import { typeReducer } from './slices/typeSlice';
import { categoryReducer } from './slices/categorySlice';
import { authReducer } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        type: typeReducer,
        user: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
