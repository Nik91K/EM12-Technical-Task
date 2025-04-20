import { configureStore } from '@reduxjs/toolkit';
import { typeReducer } from './slices/typeSlice';
import { categoryReducer } from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        type: typeReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
