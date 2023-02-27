import { coursesTypes } from './courses.types';

/*
 * ACTION CREATOR TYPES
 */

interface GetCoursesAction {
	type: coursesTypes.GET;
	payload: Course[];
}

interface AddCourseAction {
	type: coursesTypes.ADD;
	payload: Course;
}

interface DeleteCourseAction {
	type: coursesTypes.DELETE;
	payload: string;
}

interface UpdateCourseAction {
	type: coursesTypes.UPDATE;
	payload: Course;
}

/*
 * ACTION CREATORS
 */

export const getCoursesActionCreator = (
	payload: Course[]
): GetCoursesAction => {
	return {
		type: coursesTypes.GET,
		payload,
	};
};

export const addCourseActionCreator = (payload: Course): AddCourseAction => {
	return {
		type: coursesTypes.ADD,
		payload,
	};
};

export const deleteCourseActionCreator = (
	payload: string
): DeleteCourseAction => {
	return {
		type: coursesTypes.DELETE,
		payload,
	};
};

export const updateCourseActionCreator = (
	payload: Course
): UpdateCourseAction => {
	return {
		type: coursesTypes.UPDATE,
		payload,
	};
};

export type CoursesActionsUnion =
	| DeleteCourseAction
	| GetCoursesAction
	| AddCourseAction
	| UpdateCourseAction;
