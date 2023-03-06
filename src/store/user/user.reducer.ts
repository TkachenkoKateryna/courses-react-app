import { UserActionsUnion } from './user.actions';
import { userTypes } from './user.types';

export interface UserState {
	user: User;
	token: string;
	isAuth: boolean;
	loading: boolean;
}

const initialState: UserState = {
	user: { name: '', email: '', role: '' },
	token: localStorage.getItem('jwt') || '',
	isAuth: false,
	loading: false,
};

export const userReducer = (
	state = initialState,
	action: UserActionsUnion
): UserState => {
	switch (action.type) {
		case userTypes.LOGIN:
			return {
				...state,
				loading: true,
			};
		case userTypes.LOGIN_SUCCESS:
			return {
				user: action.payload.user,
				isAuth: true,
				token: action.payload.result,
				loading: false,
			};
		case userTypes.REGISTER:
			return {
				...state,
				loading: true,
			};
		case userTypes.REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
			};
		case userTypes.LOGOUT:
			return {
				...state,
				user: initialState.user,
				isAuth: false,
				token: '',
			};
		case userTypes.FETCH_CURRENT_USER:
			return {
				...state,
				loading: true,
			};
		case userTypes.FETCH_CURRENT_USER_SUCCESS:
			return {
				...state,
				user: action.payload.result,
				isAuth: true,
				loading: false,
			};
		default:
			return state;
	}
};
