import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types/categoryTypes";
import axios from "../axios"

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
const SLICE_URL = "categories"

export const fetchCategories = createAsyncThunk(
  "auth/categories", 
  async (categoryData: {name:string}, { rejectWithValue } ) => {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/api/v1/${SLICE_URL}`)
        return response.data
      } catch (error: any) {
          return rejectWithValue(error.response.data)
      }
  });

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
