import { RootState } from '../store';

export const getUser = (state: RootState) => state.userReducer.user;
export const isUserAuthorized = (state: RootState) => state.userReducer.isAuth;
