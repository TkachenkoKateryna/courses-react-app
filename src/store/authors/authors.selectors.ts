import { RootState } from '../store';

export const getAuthors = (state: RootState) => state.authorsReducer.authors;
