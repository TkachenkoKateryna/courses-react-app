import { UserActionsUnion } from './user.actions';
import { userTypes } from './user.types';

export interface UserState {
	user: User;
	token: string;
	isAuth: boolean;
}

const initialState: UserState = {
	user: { name: '', email: '' },
	token: '',
	isAuth: false,
};

export const userReducer = (
	state = initialState,
	action: UserActionsUnion
): UserState => {
	switch (action.type) {
		case userTypes.LOGIN:
			return {
				user: action.payload.user,
				isAuth: true,
				token: action.payload.result,
			};
		case userTypes.LOGOUT:
			return {
				user: initialState.user,
				isAuth: false,
				token: '',
			};
		default:
			return state;
	}
};
