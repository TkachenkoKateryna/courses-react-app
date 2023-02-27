import { AuthorsActionsUnion } from './authors.actions';
import { authorsTypes } from './authors.types';

export interface AuthorsState {
	authors: Author[];
}

const initialState: AuthorsState = {
	authors: [],
};

export const authorsReducer = (
	state = initialState,
	action: AuthorsActionsUnion
): AuthorsState => {
	switch (action.type) {
		case authorsTypes.GET:
			return {
				authors: action.payload,
			};
		case authorsTypes.ADD:
			return {
				authors: [...state.authors, action.payload],
			};
		default:
			return state;
	}
};
