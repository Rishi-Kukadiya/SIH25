import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/register`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(response.data.status!=201){
         return rejectWithValue(response.data.message || 'Signup failed');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "Registration",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // optional reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
