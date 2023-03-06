import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import { PageLoader } from '../../../../common/Loader/PageLoader';
import { UserRole } from '../../../../constants/userRole';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import {
	getAuthors,
	getIsAuthorLoaded,
} from '../../../../store/authors/authors.selectors';
import { fetchAuthorsThunk } from '../../../../store/authors/authors.thunks';
import {
	getCourses,
	getIsCourseLoaded,
	getIsCourseLoading,
} from '../../../../store/courses/courses.selectors';
import { fetchCoursesThunk } from '../../../../store/courses/courses.thunks';
import { getUserRole } from '../../../../store/user/user.selectors';
import { CourseCard } from '../CourseCard/CourseCard';
import SearchBar from '../SearchBar/SearchBar';

const CoursesView: FC = () => {
	const dispatch = useDispatch();
	const userRole = useSelector(getUserRole);
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const isLoading = useSelector(getIsCourseLoading);
	const isCourseLoaded = useSelector(getIsCourseLoaded);
	const isAuthorLoaded = useSelector(getIsAuthorLoaded);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		!isAuthorLoaded && dispatch(fetchAuthorsThunk());
	}, [isAuthorLoaded]);

	useEffect(() => {
		!isCourseLoaded && dispatch(fetchCoursesThunk());
	}, [isCourseLoaded]);

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

	const searchOnCoursesHandler = (value: string) => {
		setSearchText(value);
	};

	if (isLoading) return <PageLoader />;

	return (
		<Root>
			<div className='panel'>
				<SearchBar searchOnCourses={searchOnCoursesHandler} />
				<div className='actions'>
					{userRole === UserRole.ADMIN && (
						<Link to='/courses/add' relative='path'>
							<Button>Add new course</Button>
						</Link>
					)}
				</div>
			</div>
			<div className='course-list'>
				{updatedCourses.map((c) => (
					<CourseCard course={c} key={c.id} />
				))}
			</div>
		</Root>
	);
};

export default CoursesView;

const Root = styled.div`
	padding: 20px;
	box-sizing: border-box;

	.panel {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;

		div:first-of-type {
			margin-right: 30px;
		}

		.actions {
			display: flex;
			width: 30%;
			justify-content: end;
		}
	}

	@media screen and (max-width: 700px) {
		margin: 0;
	}

	.course-list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -20px 0 0;
		box-sizing: border-box;

		@media screen and (max-width: 700px) {
			margin: 0;
		}
	}
`;
