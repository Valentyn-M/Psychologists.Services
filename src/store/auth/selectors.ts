import { RootState } from '@/store/store';

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectUserName = (state: RootState) => state.auth.user.name;
