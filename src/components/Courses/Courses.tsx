import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '../../router/PrivateRoute';
import CreateCourse from '../CreateCourseForm/CreateCourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CoursesView from './components/CoursesView/CoursesView';

const Courses: FC = () => {
	return (
		<Routes>
			<Route path='' element={<CoursesView />} />
			<Route
				path='add'
				element={
					<PrivateRoute>
						<CreateCourse />
					</PrivateRoute>
				}
			/>
			<Route
				path='update/:courseId'
				element={
					<PrivateRoute>
						<CreateCourse />
					</PrivateRoute>
				}
			/>
			<Route path={':courseId'} element={<CourseInfo />} />
		</Routes>
	);
};

export default Courses;
