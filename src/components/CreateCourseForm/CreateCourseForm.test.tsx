import { expect, jest, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';

import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../constants/constants';
import { customRender } from '../../helpers/test.utils';
import * as authorsActions from '../../store/authors/authors.thunks';
import CreateAuthorForm from './components/CreateAuthorForm/CreateAuthorForm';
import CreateCourse from './CreateCourseForm';

const initialState = {
	coursesReducer: {
		courses: mockedCoursesList,
		loaded: false,
	},
	authorsReducer: { authors: mockedAuthorsList, loaded: true },
};

describe('Test CreateCourseForm', () => {
	test('CourseForm should show all authors', () => {
		const test = customRender(<CreateCourse />, {
			initialState: initialState,
		});

		const numberOfAllAuthorsItems =
			test.getAllByTestId('author-listItem').length;

		expect(numberOfAllAuthorsItems).toBe(
			test.store.getState().authorsReducer.authors.length
		);
	});

	test('Create author button should call dispatch', async () => {
		const mockDispatch = jest.fn();

		const mockUseDispatch = jest.spyOn(authorsActions, 'addAuthorThunk');
		mockUseDispatch.mockReturnValue(mockDispatch);

		jest.mock('react-redux', () => ({
			useDispatch: mockDispatch,
		}));

		const test = customRender(<CreateAuthorForm />, {
			initialState: { ...initialState },
		});

		const buttonElement = test.getByText('Submit author');
		userEvent.click(buttonElement);

		expect(mockUseDispatch).toHaveBeenCalled();
	});
});
