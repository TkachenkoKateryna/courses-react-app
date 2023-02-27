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
	let result = state;
	switch (action.type) {
		case userTypes.LOGIN:
			result = {
				...state,
				user: action.payload.user,
				isAuth: true,
				token: action.payload.result,
			};
			break;
		case userTypes.LOGOUT:
			result = {
				...state,
				user: initialState.user,
				isAuth: false,
				token: '',
			};
			break;
		default:
			break;
	}

	return result;
};
