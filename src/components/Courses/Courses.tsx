import { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { formatCreationDate } from '../../helpers/formatCreationDate';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import CreateCourse from '../CreateCourseForm/CreateCourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CoursesView from './components/CoursesView/CoursesView';
import agent from '../../api/agent';
import { getAuthors } from '../../store/authors/authors.selectors';
import { getCourses } from '../../store/courses/courses.selectors';
import {
	addAuthorActionCreator,
	getAuthorsActionCreator,
} from '../../store/authors/authors.actions';
import {
	addCourseActionCreator,
	getCoursesActionCreator,
} from '../../store/courses/courses.actions';

const Courses: FC = () => {
	const [searchText, setSearchText] = useState('');

	const dispatch = useDispatch();

	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);

	useEffect(() => {
		const fetchAuthors = async () => {
			const { successful, result: authors } = await agent.Authors.get();

			if (successful) {
				dispatch(getAuthorsActionCreator(authors));
			}
		};

		const fetchCourses = async () => {
			const { successful, result: courses } = await agent.Courses.get();

			if (successful) {
				dispatch(getCoursesActionCreator(courses));
			}
		};

		fetchAuthors();
		fetchCourses();
	}, []);

	const updatedCourses: CourseView[] = courses
		.map((c) => ({
			...c,
			duration: getCourseDuration(c.duration),
			creationDate: formatCreationDate(c.creationDate),
			authors: c.authors
				.map((id) => {
					const author = authors.find((a) => a.id === id);
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

		dispatch(addCourseActionCreator(newCourse));
	};

	const addAuthorHandler = (formAuthorValues: CreateAuthorFormValues) => {
		const newAuthor: Author = {
			...formAuthorValues,
			id: uuidv4(),
		};

		dispatch(addAuthorActionCreator(newAuthor));
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
