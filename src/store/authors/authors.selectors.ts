import { RootState } from '../store';

export const getAuthors = (state: RootState) => state.authorsReducer.authors;
export const getIsAuthorLoading = (state: RootState) =>
	state.authorsReducer.loading;
export const getIsAuthorLoaded = (state: RootState) =>
	state.authorsReducer.loaded;
