import { customRender } from '../../../../helpers/test.utils';
import CoursesView from './CoursesView';
import userEvent from '@testing-library/user-event';
import {
	mockedAuthorsList,
	mockedCoursesList,
	mockedAdmin,
	mockedUser,
} from '../../../../constants/constants';

const initialState = {
	coursesReducer: { courses: mockedCoursesList, loaded: true },
	authorsReducer: { authors: mockedAuthorsList, loaded: true },
};

describe('Test CourseView', () => {
	test('Test the correct number of CourseCards', () => {
		const test = customRender(<CoursesView />, {
			initialState: initialState,
		});

		const numberOfCourses = test.store.getState().coursesReducer.courses.length;

		const numberOfCards = test.getAllByTestId('course-card').length;

		expect(numberOfCards).toBe(numberOfCourses);
	});

	test('AddNewCourse btn redirects to CourseForm', () => {
		const test = customRender(<CoursesView />, {
			initialState: { ...initialState, userReducer: { user: mockedAdmin } },
		});

		const buttonElement = test.getByText('Add new course');
		userEvent.click(buttonElement);

		expect(window.location.pathname).toBe('/courses/add');
	});

	test('AddNewCourse btn is not shown for user', () => {
		const test = customRender(<CoursesView />, {
			initialState: { ...initialState, userReducer: { user: mockedUser } },
		});

		expect(test.queryByTestId('add-course-btn')).not.toBeInTheDocument();
	});
});
