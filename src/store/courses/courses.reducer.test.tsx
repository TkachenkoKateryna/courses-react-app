import {
	addCourseActionSuccessCreator,
	CoursesActionsUnion,
} from './courses.actions';
import { coursesReducer } from './courses.reducer';
import { CourseState } from '../courses/courses.reducer';
import { mockedCourse } from '../../constants/constants';

const initialState: CourseState = {
	courses: [],
	item: {} as Course,
	loading: false,
	loaded: false,
};

describe('Courses reducer', () => {
	test('Should return the initial state', () => {
		expect(coursesReducer(undefined, {} as CoursesActionsUnion)).toEqual(
			initialState
		);
	});

	test('Should handle ADD_COURSE_SUCCESS and return a new state', () => {
		expect(
			coursesReducer(undefined, addCourseActionSuccessCreator(mockedCourse))
		).toEqual({ ...initialState, courses: [mockedCourse] });
	});
});
