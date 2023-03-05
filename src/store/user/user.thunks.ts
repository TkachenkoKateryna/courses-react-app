import axiosAgent from '../../api/axiosAgent';
import { ThunkAction } from '../store';
import {
	getCurrentUserActionCreator,
	getCurrentUserActionSuccessCreator,
	loginActionCreator,
	loginActionSuccessCreator,
	logoutActionCreator,
	registerActionCreator,
	registerActionSuccessCreator,
} from './user.actions';

export const loginThunk = (
	user: AuthFormValues
): ThunkAction<Promise<LoginResponse>> => {
	return async (dispatch) => {
		dispatch(loginActionCreator());
		const data = await axiosAgent.Auth.login(user);

		if (data.successful) {
			localStorage.setItem('jwt', data.result);
			dispatch(loginActionSuccessCreator(data));
		}

		return data;
	};
};

export const registerThunk = (
	user: AuthFormValues
): ThunkAction<Promise<RegisterResponse>> => {
	return async (dispatch) => {
		dispatch(registerActionCreator());
		const data = await axiosAgent.Auth.register(user);

		if (data.successful) {
			dispatch(registerActionSuccessCreator());
		}

		return data;
	};
};

export const getCurrentUserThunk = (): ThunkAction => {
	return async (dispatch) => {
		getCurrentUserActionCreator();
		const data = await axiosAgent.Auth.getCurrentUser();

		if (data.successful) {
			dispatch(getCurrentUserActionSuccessCreator(data));
		}

		return data;
	};
};

export const logoutThunk = (): ThunkAction => {
	return async (dispatch) => {
		await axiosAgent.Auth.logout();
		localStorage.removeItem('jwt');
		dispatch(logoutActionCreator());
	};
};
