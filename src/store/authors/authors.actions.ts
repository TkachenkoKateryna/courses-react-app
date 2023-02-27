import { authorsTypes } from './authors.types';

interface GetAuthorsAction {
	type: authorsTypes.GET;
	payload: Author[];
}

interface AddAuthorAction {
	type: authorsTypes.ADD;
	payload: Author;
}

export const getAuthorsActionCreator = (
	payload: Author[]
): GetAuthorsAction => {
	return {
		type: authorsTypes.GET,
		payload,
	};
};

export const addAuthorActionCreator = (payload: Author): AddAuthorAction => {
	return {
		type: authorsTypes.ADD,
		payload,
	};
};

export type AuthorsActionsUnion = GetAuthorsAction | AddAuthorAction;
