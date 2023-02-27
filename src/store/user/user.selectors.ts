import { RootState } from '../store';

export const getUser = (state: RootState) => state.userReducer.user;
export const getAuthState = (state: RootState) => state.userReducer.isAuth;
