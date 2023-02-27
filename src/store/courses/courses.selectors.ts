import { RootState } from '../store';

export const getCourses = (state: RootState) => state.coursesReducer.courses;
