import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../constants/constants';
import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import CreateCourse from '../CreateCourseForm/CreateCourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CoursesView from './components/CoursesView/CoursesView';

const Courses: FC = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [searchText, setSearchText] = useState('');

	const updatedCourses: CourseView[] = courses
		.map((c) => ({
			...c,
			duration: getCourseDuration(c.duration),
			creationDate: formatCreationDate(c.creationDate),
			authors: c.authors
				.map((id) => {
					const author = mockedAuthorsList.find((a) => a.id === id);
					return author?.name || '';
				})
				.filter(Boolean)
				.join(', '),
		}))
		.filter((course) =>
			course.title.toLowerCase().includes(searchText.toLowerCase())
		);

	const addCourseHandler = (formCourseValues: CreateCourseFormValues) => {
		console.log('formCourseValues', formCourseValues);
		const newCourse: Course = {
			...formCourseValues,
			id: uuidv4(),
			creationDate: new Date().toLocaleDateString('en-GB'),
		};

		setCourses((prevState) => [...prevState, newCourse]);
	};

	const addAuthorHandler = (formAuthorValues: CreateAuthorFormValues) => {
		const newAuthor: Author = {
			...formAuthorValues,
			id: uuidv4(),
		};

		setAuthors((prevState) => [...prevState, newAuthor]);
	};

	const searchOnCoursesHandler = (value: string) => {
		setSearchText(value);
	};

	const getCourseByIdHandler = (courseId: string) => {
		return updatedCourses.find((c) => c.id === courseId);
	};

	return (
		<Routes>
			<Route
				path=''
				element={
					<CoursesView
						courses={updatedCourses}
						searchOnCourses={searchOnCoursesHandler}
					/>
				}
			/>
			<Route
				path='add'
				element={
					<CreateCourse
						addCourse={addCourseHandler}
						addAuthor={addAuthorHandler}
						authors={authors}
					/>
				}
			/>
			<Route
				path={':courseId'}
				element={<CourseInfo getCourseById={getCourseByIdHandler} />}
			/>
		</Routes>
	);
};

export default Courses;
