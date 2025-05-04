import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";

export type Type = {
    id: number;
    name: "Income" | "Expense";
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

const SLICE_URL = "transaction-type"
 

export const fetchTypes = createAsyncThunk(
  "types/fetch", 
  async (typeData: {name: string}, { rejectWithValue }) => {
    try {
      const response:any = await axios.post(`/${SLICE_URL}`, typeData)
      return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const typeSlice  = createSlice({
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
