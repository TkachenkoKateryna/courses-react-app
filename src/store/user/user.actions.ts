import { userTypes } from './user.types';

export interface LoginAction {
	type: userTypes.LOGIN;
}

export const loginActionCreator = (): LoginAction => {
	return {
		type: userTypes.LOGIN,
	};
};

export interface LoginSuccessAction {
	type: userTypes.LOGIN_SUCCESS;
	payload: LoginResponse;
}

export const loginActionSuccessCreator = (
	payload: LoginResponse
): LoginSuccessAction => {
	return {
		type: userTypes.LOGIN_SUCCESS,
		payload,
	};
};

export interface RegisterAction {
	type: userTypes.REGISTER;
}

export const registerActionCreator = (): RegisterAction => {
	return {
		type: userTypes.REGISTER,
	};
};

export interface RegisterSuccessAction {
	type: userTypes.REGISTER_SUCCESS;
}

export const registerActionSuccessCreator = (): RegisterSuccessAction => {
	return {
		type: userTypes.REGISTER_SUCCESS,
	};
};

export interface LogoutAction {
	type: userTypes.LOGOUT;
}

export const logoutActionCreator = (): LogoutAction => {
	return {
		type: userTypes.LOGOUT,
	};
};

export interface GetCurrentUserAction {
	type: userTypes.FETCH_CURRENT_USER;
}

export interface GetCurrentUserSuccessAction {
	type: userTypes.FETCH_CURRENT_USER_SUCCESS;
	payload: ApiResponse<User>;
}

export const getCurrentUserActionCreator = (): GetCurrentUserAction => {
	return {
		type: userTypes.FETCH_CURRENT_USER,
	};
};

export const getCurrentUserActionSuccessCreator = (
	payload: ApiResponse<User>
): GetCurrentUserSuccessAction => {
	return {
		type: userTypes.FETCH_CURRENT_USER_SUCCESS,
		payload,
	};
};

export type UserActionsUnion =
	| LoginAction
	| LoginSuccessAction
	| RegisterAction
	| RegisterSuccessAction
	| LogoutAction
	| GetCurrentUserAction
	| GetCurrentUserSuccessAction;
