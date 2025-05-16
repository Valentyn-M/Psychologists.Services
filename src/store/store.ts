import { authReducer } from '@/store/auth/slice';
import { configureStore } from '@reduxjs/toolkit';

// 1
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 2
const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token', 'user', 'isLoggedIn'], // Зберігаємо необхідні дані. У Firebase немає авторитетного refresh-запиту (зберігати лише ['token'] замало)
};

// 3
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },

  // 4
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Типізація кореневого стейта та диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 5
export const persistor = persistStore(store);
