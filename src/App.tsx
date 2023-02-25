import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import CreateCourse from './components/CreateCourseForm/CreateCourseForm';
import { formatCreationDate } from './helpers/formatCreationDate';
import { getCourseDuration } from './helpers/getCourseDuration';
import { mockedAuthorsList, mockedCoursesList } from './constants/constants';

const App: FC = () => {
	const [isShowForm, setIsShowForm] = useState(false);
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

	const courseFormHandler = () => {
		setIsShowForm((prevState) => !prevState);
	};

	const addCourseHandler = (formCourseValues: CreateCourseFormValues) => {
		const newCourse: Course = {
			...formCourseValues,
			id: uuidv4(),
			creationDate: new Date().toLocaleDateString('en-GB'),
		};

		setCourses((prevState) => [...prevState, newCourse]);
		courseFormHandler();
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

	return (
		<>
			<Header />
			{isShowForm ? (
				<CreateCourse
					addCourse={addCourseHandler}
					addAuthor={addAuthorHandler}
					authors={authors}
					setPageView={courseFormHandler}
				/>
			) : (
				<Courses
					courses={updatedCourses}
					setPageView={courseFormHandler}
					searchOnCourses={searchOnCoursesHandler}
				/>
			)}
		</>
	);
};

export default App;
