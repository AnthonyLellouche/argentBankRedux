// src/features/auth/authSlice.js
import { apiUrl } from "../../config";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      // Stocker le token dans localStorage
      const token = response.data.body.token; // Assurez-vous de bien utiliser le chemin correct pour récupérer le token
      localStorage.setItem('token', token);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.log('API error:', error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.post(`${apiUrl}/profile`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Profile API response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Profile API error:', error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); // Supprimer le token lors de la déconnexion
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, profile: action.payload };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;
