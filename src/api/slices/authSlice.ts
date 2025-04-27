import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    categories: [];
}

interface TypeState {
    types: User[];
    loading: boolean;
    error: string | null;
}

const initialState: TypeState = {
  types: [],
  loading: false,
  error: null,
}

const API_URL = process.env.API_URL || "http://localhost:3000/types"

export const registerUser = createAsyncThunk(
    "user/register",
    async (userData: Omit<User, "id" | "categories">, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/register`, userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // реєстр
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.types.push(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // лоігін
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.types.push(action.payload)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default authSlice.reducer
