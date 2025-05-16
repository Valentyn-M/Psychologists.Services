import { registerUser } from '@/store/auth/operations';
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
  idToken: string; // Токен авторизації
  email: string; // Email користувача
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string; // Можливо, буде, якщо імʼя додано через updateProfile
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse & { displayName: string }>) => {
        state.loading = false;
        state.user.email = action.payload.email;
        state.user.name = action.payload.displayName;
        state.token = action.payload.idToken;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addMatcher(isAnyOf(registerUser.pending), (state) => {
        state.loading = true;
        state.error = null;
      })

      // rejected має payload типу unknown, тому вказуємо PayloadAction<any>
      .addMatcher(isAnyOf(registerUser.rejected), (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const authReducer = slice.reducer;
