import { RootState } from '../store';

export const getCourses = (state: RootState) => state.coursesReducer.courses;
export const getCourseById = (id: string) => (state: RootState) =>
	state.coursesReducer.courses.find((c) => c.id === id);
export const getCourseItem = (state: RootState) => state.coursesReducer.item;
export const getIsCourseLoading = (state: RootState) =>
	state.coursesReducer.loading;
export const getIsCourseLoaded = (state: RootState) =>
	state.coursesReducer.loaded;
