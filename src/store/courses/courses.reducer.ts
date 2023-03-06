import { CoursesActionsUnion } from './courses.actions';
import { coursesTypes } from './courses.types';

export interface CourseState {
	courses: Course[];
	item: Course;
	loading: boolean;
	loaded: boolean;
}

const initialState: CourseState = {
	courses: [],
	item: {} as Course,
	loading: false,
	loaded: false,
};

export const coursesReducer = (
	state = initialState,
	action: CoursesActionsUnion
): CourseState => {
	switch (action.type) {
		case coursesTypes.FETCH_COURSE:
			return {
				...state,
				loading: true,
			};
		case coursesTypes.FETCH_COURSE_SUCCESS:
			return {
				...state,
				courses: action.payload,
				loading: false,
				loaded: true,
			};
		case coursesTypes.FETCH_COURSE_BY_ID:
			return {
				...state,
				loading: true,
			};
		case coursesTypes.FETCH_COURSE_BY_ID_SUCCESS:
			return {
				...state,
				item: action.payload,
				loading: false,
			};
		case coursesTypes.ADD_COURSE:
			return {
				...state,
				loading: true,
			};
		case coursesTypes.ADD_COURSE_SUCCESS:
			return {
				...state,
				courses: [...state.courses, action.payload],
				loading: false,
			};
		case coursesTypes.DELETE_COURSE:
			return {
				...state,
				loading: true,
			};
		case coursesTypes.DELETE_COURSE_SUCCESS:
			return {
				...state,
				courses: state.courses.filter((a) => a.id !== action.payload),
				loading: false,
			};
		case coursesTypes.UPDATE_COURSE:
			return {
				...state,
				loading: true,
			};
		case coursesTypes.UPDATE_COURSE_SUCCESS:
			return {
				...state,
				item: action.payload,
				courses: state.courses.map((c) => {
					if (c.id === action.payload.id) {
						return action.payload;
					}
					return c;
				}),
				loading: false,
			};
		default:
			return state;
	}
};
