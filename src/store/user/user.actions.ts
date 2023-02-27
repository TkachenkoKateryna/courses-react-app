import { userTypes } from './user.types';

export interface LoginAction {
	type: userTypes.LOGIN;
	payload: LoginResponse;
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

export const logoutActionCreator = (): LogoutAction => {
	return {
		type: userTypes.LOGOUT,
	};
};

export type UserActionsUnion = LoginAction | LogoutAction;
