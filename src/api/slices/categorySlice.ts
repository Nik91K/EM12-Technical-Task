import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3000"

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await axios.get<Category[]>(API_URL)
  return res.data
})

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Something went wrong"
      });
  },
});

export const { reducer: categoryReducer } = categorySlice;
