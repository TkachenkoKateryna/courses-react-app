import { UserRole } from '../../constants/userRole';
import { RootState } from '../store';

export const getUser = (state: RootState) => state.userReducer.user;
export const getToken = (state: RootState) => state.userReducer.token;
export const isUserAuthorized = (state: RootState) => state.userReducer.isAuth;
export const getUserRole = (state: RootState) => state.userReducer.user.role;
export const isUserLoading = (state: RootState) => state.userReducer.loading;
export const getIsAdminRole = (state: RootState) =>
	state.userReducer.user.role === UserRole.ADMIN;
