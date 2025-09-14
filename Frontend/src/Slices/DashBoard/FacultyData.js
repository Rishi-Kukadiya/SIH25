import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const facultydata = createAsyncThunk(
  "data/facultydata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/faculty/dashboard`, 
        {
          withCredentials: true, 
        }
      );

      if (response.status !== 200) {
        return rejectWithValue(response.data.message || "Failed to fetch data");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const dataSlice = createSlice({
  name: "Facultydata",
  initialState: {
    data: null,
    Loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(facultydata.pending, (state) => {
        state.Loading = true;
        state.error = null;
      })
      .addCase(facultydata.fulfilled, (state, action) => {
        state.Loading = false;
        state.data = action.payload;
      })
      .addCase(facultydata.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;
