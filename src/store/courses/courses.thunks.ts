import axiosAgent from '../../api/axiosAgent';
import { ThunkAction } from '../store';
import {
	addCourseActionCreator,
	addCourseActionSuccessCreator,
	deleteCourseActionCreator,
	deleteCourseActionSuccessCreator,
	fetchCourseByIdActionCreator,
	fetchCourseByIdActionSuccessCreator,
	fetchCoursesActionCreator,
	fetchCoursesActionSuccessCreator,
	updateCourseActionCreator,
	updateCourseActionSuccessCreator,
} from './courses.actions';

export const fetchCoursesThunk = (): ThunkAction => {
	return async (dispatch) => {
		dispatch(fetchCoursesActionCreator());
		const { successful, result: courses } = await axiosAgent.Courses.get();

		if (successful) {
			dispatch(fetchCoursesActionSuccessCreator(courses));
		}
	};
};

export const fetchCourseByIdThunk = (id: string): ThunkAction => {
	return async (dispatch) => {
		dispatch(fetchCourseByIdActionCreator());
		const data = await axiosAgent.Courses.getById(id);

		if (data.successful) {
			dispatch(fetchCourseByIdActionSuccessCreator(data.result));
		}
	};
};

export const addCourseThunk = (
	newCourse: CreateCourseFormValues
): ThunkAction => {
	return async (dispatch) => {
		dispatch(addCourseActionCreator());
		const { successful, result: course } = await axiosAgent.Courses.add(
			newCourse
		);

		if (successful) {
			dispatch(addCourseActionSuccessCreator(course));
		}
	};
};

export const editCourseThunk = (
	updatedCourse: CreateCourseFormValues,
	id: string
): ThunkAction => {
	return async (dispatch) => {
		dispatch(updateCourseActionCreator());
		const { successful, result: course } = await axiosAgent.Courses.update(
			updatedCourse,
			id
		);

		if (successful) {
			dispatch(updateCourseActionSuccessCreator(course));
		}
	};
};

export const removeCourseThunk = (id: string): ThunkAction => {
	return async (dispatch) => {
		dispatch(deleteCourseActionCreator());
		const { successful } = await axiosAgent.Courses.remove(id);

		if (successful) {
			dispatch(deleteCourseActionSuccessCreator(id));
		}
	};
};
