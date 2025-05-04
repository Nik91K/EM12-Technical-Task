import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionType } from '../../types/transactionType'
import { Type } from '../../types/type';
import { Category } from '../../types/categoryTypes';
import axios from '../axios'

export type CreateTransactiontype = {
    type: "Income" | "Expense"
    categoryId: number
    value: number
    date: string
  }

interface TransactionState {
    transaction: TransactionType[]
    type: Type[]
    category: Category[]
    loading: boolean
    error: string | null
}

const initialState: TransactionState = {
    transaction: [],
    type: [],
    category: [],
    loading: false,
    error: null,
}

const SLICE_URL = "transactions"

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async (transactionData: CreateTransactiontype, { rejectWithValue }) => {
      try {
        console.log("Запит:", transactionData)
        const response = await axios.post<TransactionType>(`/${SLICE_URL}`, transactionData)
        return response.data
      } catch (error: any) {
        return rejectWithValue(error.response.data)
      }
    }
)

export const fetchTransaction = createAsyncThunk(
  'transaction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/${SLICE_URL}`);
      return response.data as TransactionType[]
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false
        state.transaction.push(action.payload)
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false
        state.transaction = action.payload
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default transactionSlice.reducer

