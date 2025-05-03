import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "../../types/userTypes";

interface TypeState {
    user: UserType | null;
    loading: boolean;
    error: string | null;
    token: string | null
}

const initialState: TypeState = {
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem('token') || null,
}

const API_URL = "http://localhost:3000/api/v1"
const SLICE_URL = "auth"

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`${API_URL}/${SLICE_URL}/register`, userData)
            localStorage.setItem('token', response.data.access_token)
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response:any = await axios.post(`${API_URL}/${SLICE_URL}/login`, userData)
            localStorage.setItem('token', response.data.access_token)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Login failed")
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
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
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
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }
})

export default authSlice.reducer
