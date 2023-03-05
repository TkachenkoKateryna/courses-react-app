import { authorsTypes } from './authors.types';

interface FetchAuthorsAction {
	type: authorsTypes.FETCH_AUTHORS;
}

interface FetchAuthorsSuccessAction {
	type: authorsTypes.FETCH_AUTHORS_SUCCESS;
	payload: Author[];
}

interface AddAuthorAction {
	type: authorsTypes.ADD_AUTHOR;
}

interface AddAuthorSuccessAction {
	type: authorsTypes.ADD_AUTHOR_SUCCESS;
	payload: Author;
}

export const fetchAuthorsActionCreator = (): FetchAuthorsAction => {
	return {
		type: authorsTypes.FETCH_AUTHORS,
	};
};

export const fetchAuthorsActionSuccessCreator = (
	payload: Author[]
): FetchAuthorsSuccessAction => {
	return {
		type: authorsTypes.FETCH_AUTHORS_SUCCESS,
		payload,
	};
};

export const addAuthorActionCreator = (): AddAuthorAction => {
	return {
		type: authorsTypes.ADD_AUTHOR,
	};
};

export const addAuthorActionSuccessCreator = (
	payload: Author
): AddAuthorSuccessAction => {
	return {
		type: authorsTypes.ADD_AUTHOR_SUCCESS,
		payload,
	};
};

export type AuthorsActionsUnion =
	| FetchAuthorsAction
	| FetchAuthorsSuccessAction
	| AddAuthorAction
	| AddAuthorSuccessAction;
