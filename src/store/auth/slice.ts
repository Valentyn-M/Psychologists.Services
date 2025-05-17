import { loginUser, logoutUser, refreshUser, registerUser } from '@/store/auth/operations';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string | null;
  email: string | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

// Тип для відповіді після успішної реєстрації
interface RegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName: string;
}

interface LoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse & { displayName: string }>) => {
        state.loading = false;
        state.user.email = action.payload.email;
        state.user.name = action.payload.displayName;
        state.token = action.payload.idToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      // LOGIN
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user.email = action.payload.email;
        state.user.name = action.payload.displayName ?? null;
        state.token = action.payload.idToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, () => initialState)

      // REFRESH
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, logoutUser.pending, refreshUser.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected, logoutUser.rejected, refreshUser.rejected),
        (state, action) => {
          state.loading = false;
          state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
        }
      );
  },
});

export const authReducer = slice.reducer;
