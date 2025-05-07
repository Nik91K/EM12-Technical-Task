import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from "../../types/categoryTypes";
import axios from "../axios"

interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const SLICE_URL = "categories"

export const createCatagory = createAsyncThunk(
  'category/create',
  async (categoryData: { name: string }, { rejectWithValue } ) => {
    try {
        const response:any = await axios.post(`/${SLICE_URL}`, categoryData)
        return response.data
      } catch (error: any) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/${SLICE_URL}`);
      return response.data as Category[]
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/{SLICE_URL}/${categoryId}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // зберегти
      .addCase(createCatagory.pending, (state) => {
          state.loading = true
          state.error = null
      })
      .addCase(createCatagory.fulfilled, (state, action) => {
          state.loading = false
          state.categories.push(action.payload)
      })
      .addCase(createCatagory.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload as string
      })
    // відображати
    .addCase(fetchCategories.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    // видалити
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(deleteCategory.rejected,  (state, action) => {
      state.loading = false
      state.categories = state.categories.filter((category) => category.id !== action.payload)
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
});

export default categorySlice.reducer
