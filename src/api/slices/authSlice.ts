import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
    name: string;
    email: string;
    password: string;
}

interface TypeState {
    types: User[];
    loading: boolean;
    error: string | null;
    token: string | null
}

const initialState: TypeState = {
  types: [],
  loading: false,
  error: null,
  token: localStorage.getItem('token') || null,
}

const API_URL = "http://localhost:3000"
const SLISE_URL = "auth"

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData: { email: string; password: string; name: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/${SLISE_URL}/register`, userData)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/${SLISE_URL}/login`, credentials)
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
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                const response:{ access_token: string } = action.payload as any
                localStorage.setItem('token', response.access_token)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // лоігін
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                const response:{ access_token: string } = action.payload as any
                localStorage.setItem('token', response.access_token)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
});

export const { reducer: authReducer } = authSlice;
