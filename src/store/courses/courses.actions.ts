import { coursesTypes } from './courses.types';

interface FetchCoursesAction {
	type: coursesTypes.FETCH_COURSE;
}

export const fetchCoursesActionCreator = (): FetchCoursesAction => {
	return {
		type: coursesTypes.FETCH_COURSE,
	};
};

interface FetchCoursesActionSuccess {
	type: coursesTypes.FETCH_COURSE_SUCCESS;
	payload: Course[];
}

export const fetchCoursesActionSuccessCreator = (
	payload: Course[]
): FetchCoursesActionSuccess => {
	return {
		type: coursesTypes.FETCH_COURSE_SUCCESS,
		payload,
	};
};

interface AddCourseAction {
	type: coursesTypes.ADD_COURSE;
}

export const addCourseActionCreator = (): AddCourseAction => {
	return {
		type: coursesTypes.ADD_COURSE,
	};
};

interface AddCourseActionSuccess {
	type: coursesTypes.ADD_COURSE_SUCCESS;
	payload: Course;
}

export const addCourseActionSuccessCreator = (
	payload: Course
): AddCourseActionSuccess => {
	return {
		type: coursesTypes.ADD_COURSE_SUCCESS,
		payload,
	};
};

interface DeleteCourseAction {
	type: coursesTypes.DELETE_COURSE;
}

export const deleteCourseActionCreator = (): DeleteCourseAction => {
	return {
		type: coursesTypes.DELETE_COURSE,
	};
};

interface DeleteCourseActionSuccess {
	type: coursesTypes.DELETE_COURSE_SUCCESS;
	payload: string;
}

export const deleteCourseActionSuccessCreator = (
	payload: string
): DeleteCourseActionSuccess => {
	return {
		type: coursesTypes.DELETE_COURSE_SUCCESS,
		payload,
	};
};

interface UpdateCourseAction {
	type: coursesTypes.UPDATE_COURSE;
}

export const updateCourseActionCreator = (): UpdateCourseAction => {
	return {
		type: coursesTypes.UPDATE_COURSE,
	};
};

interface UpdateCourseActionSuccess {
	type: coursesTypes.UPDATE_COURSE_SUCCESS;
	payload: Course;
}

export const updateCourseActionSuccessCreator = (
	payload: Course
): UpdateCourseActionSuccess => {
	return {
		type: coursesTypes.UPDATE_COURSE_SUCCESS,
		payload,
	};
};

interface FetchCourseByIdAction {
	type: coursesTypes.FETCH_COURSE_BY_ID;
}
export const fetchCourseByIdActionCreator = (): FetchCourseByIdAction => {
	return {
		type: coursesTypes.FETCH_COURSE_BY_ID,
	};
};

interface FetchCourseByIdActionSuccess {
	type: coursesTypes.FETCH_COURSE_BY_ID_SUCCESS;
	payload: Course;
}

export const fetchCourseByIdActionSuccessCreator = (
	payload: Course
): FetchCourseByIdActionSuccess => {
	return {
		type: coursesTypes.FETCH_COURSE_BY_ID_SUCCESS,
		payload,
	};
};

export type CoursesActionsUnion =
	| DeleteCourseAction
	| DeleteCourseActionSuccess
	| FetchCoursesAction
	| FetchCoursesActionSuccess
	| AddCourseAction
	| AddCourseActionSuccess
	| UpdateCourseAction
	| UpdateCourseActionSuccess
	| FetchCourseByIdAction
	| FetchCourseByIdActionSuccess;
