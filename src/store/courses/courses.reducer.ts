import { CoursesActionsUnion } from './courses.actions';
import { coursesTypes } from './courses.types';

export interface CourseState {
	courses: Course[];
}

const initialState: CourseState = {
	courses: [],
};

export const coursesReducer = (
	state = initialState,
	action: CoursesActionsUnion
): CourseState => {
	switch (action.type) {
		case coursesTypes.GET:
			return {
				...state,
				courses: action.payload,
			};
		case coursesTypes.ADD:
			return {
				...state,
				courses: [...state.courses, action.payload],
			};
		case coursesTypes.DELETE:
			return {
				...state,
				courses: state.courses.filter((a) => a.id !== action.payload),
			};
		case coursesTypes.UPDATE:
			return {
				...state,
				courses: state.courses.map<Course>((c) => {
					if (c.id === action.payload.id) {
						c = action.payload;
					}
					return c;
				}),
			};
		default:
			return state;
	}
};
