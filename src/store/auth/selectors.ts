import { RootState } from '@/store/store';

export const selectLoading = (state: RootState) => state.auth.loading;
