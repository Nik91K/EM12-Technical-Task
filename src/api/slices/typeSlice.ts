import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Type = {
    id: number;
    name: "income" | "expense";
}

interface TypeState {
    types: Type[];
    loading: boolean;
    error: string | null;
}

const initialState: TypeState = {
  types: [],
  loading: false,
  error: null,
}

const API_URL = "http://localhost:3000"

export const fetchTypes = createAsyncThunk("types/fetch", async () => {
    const res = await axios.get<Type[]>(API_URL)
    return res.data
})

const typeSlice  = createSlice({
    name: "type",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTypes.pending, (state) => {
            state.loading = true
          })
          .addCase(fetchTypes.fulfilled, (state, action: PayloadAction<Type[]>) => {
            state.loading = false
            state.types = action.payload
          })
          .addCase(fetchTypes.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong"
          });
    },
})

export default typeSlice.reducer
