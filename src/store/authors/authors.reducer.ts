import { AuthorsActionsUnion } from './authors.actions';
import { authorsTypes } from './authors.types';

export interface AuthorsState {
	authors: Author[];
	loading: boolean;
	loaded: boolean;
}

const initialState: AuthorsState = {
	authors: [],
	loading: false,
	loaded: false,
};

export const authorsReducer = (
	state = initialState,
	action: AuthorsActionsUnion
): AuthorsState => {
	switch (action.type) {
		case authorsTypes.FETCH_AUTHORS:
			return {
				...state,
				loading: true,
			};
		case authorsTypes.FETCH_AUTHORS_SUCCESS:
			return {
				...state,
				authors: action.payload,
				loading: false,
				loaded: true,
			};
		case authorsTypes.ADD_AUTHOR:
			return {
				...state,
				loading: true,
			};
		case authorsTypes.ADD_AUTHOR_SUCCESS:
			return {
				...state,
				authors: [...state.authors, action.payload],
				loading: false,
			};
		default:
			return state;
	}
};
