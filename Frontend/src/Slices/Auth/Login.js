import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status !== 200) {
        return rejectWithValue(response.data.message || "Login failed");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


const authSlice = createSlice({
  name: "Login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Login fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      // Login rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
