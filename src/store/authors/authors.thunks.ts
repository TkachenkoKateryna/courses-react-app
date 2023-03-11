import axiosAgent from '../../api/axiosAgent';
import { ThunkAction } from '../store';
import {
	addAuthorActionCreator,
	addAuthorActionSuccessCreator,
	fetchAuthorsActionCreator,
	fetchAuthorsActionSuccessCreator,
} from './authors.actions';

export const fetchAuthorsThunk = (): ThunkAction => {
	return async (dispatch) => {
		dispatch(fetchAuthorsActionCreator());
		const { successful, result: authors } = await axiosAgent.Authors.get();

		if (successful) {
			dispatch(fetchAuthorsActionSuccessCreator(authors));
		}
	};
};

export const addAuthorThunk = (
	newAuthor: CreateAuthorFormValues
): ThunkAction => {
	return async (dispatch) => {
		dispatch(addAuthorActionCreator());
		const { successful, result: author } = await axiosAgent.Authors.add(
			newAuthor
		);

		if (successful) {
			dispatch(addAuthorActionSuccessCreator(author));
		}
	};
};
