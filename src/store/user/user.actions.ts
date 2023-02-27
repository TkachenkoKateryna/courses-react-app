import { userTypes } from './user.types';

export interface LoginAction {
	type: userTypes.LOGIN;
	payload: LoginResponse;
}

export interface RegisterAction {
	type: userTypes.REGISTER;
	payload: RegisterResponse;
}

export interface LogoutAction {
	type: userTypes.LOGOUT;
}

export const loginActionCreator = (payload: LoginResponse): LoginAction => {
	return {
		type: userTypes.LOGIN,
		payload,
	};
};

export const registerActionCreator = (
	payload: RegisterResponse
): RegisterAction => {
	return {
		type: userTypes.REGISTER,
		payload,
	};
};

export const logoutActionCreator = (): LogoutAction => {
	return {
		type: userTypes.LOGOUT,
	};
};

export type UserActionsUnion = LoginAction | RegisterAction | LogoutAction;
