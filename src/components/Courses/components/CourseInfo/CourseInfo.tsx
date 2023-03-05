import isEmpty from 'lodash.isempty';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import { PageLoader } from '../../../../common/Loader/PageLoader';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import {
	getCourseById,
	getCourseItem,
	getIsCourseLoaded,
	getIsCourseLoading,
} from '../../../../store/courses/courses.selectors';
import { fetchCourseByIdThunk } from '../../../../store/courses/courses.thunks';

const CourseInfo: FC = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsCourseLoading);
	const isLoaded = useSelector(getIsCourseLoaded);
	const { courseId } = useParams();
	const course = isLoaded
		? useSelector(getCourseById(courseId as string))
		: useSelector(getCourseItem);

	useEffect(() => {
		if (!isLoaded && courseId) {
			dispatch(fetchCourseByIdThunk(courseId));
		}
	}, [courseId, isLoaded]);

	if (isLoading) return <PageLoader />;

	if (isEmpty(course)) {
		return <>Course undefined!</>;
	}

	return (
		<Root>
			<Link to='/'>
				<Button>Back to courses</Button>
			</Link>
			<h2>{course.title}</h2>
			<div className='main-info'>
				<p className='right'>{course.description}</p>
				<div className='left'>
					<p>
						<span>ID: </span>
						{course.id}
					</p>
					<p>
						<span>Duration: </span>
						{getCourseDuration(course.duration)}
					</p>
					<p>
						<span>Created: </span>
						{formatCreationDate(course.creationDate)}
					</p>
					<div>
						<span>Authors: </span>
						<ul>
							{course.authors.map((a) => (
								<li>{a}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</Root>
	);
};

export default CourseInfo;

const Root = styled.div`
	display: flex;
	flex-direction: column;

	h2 {
		align-self: center;
	}

	.main-info {
		display: flex;

		.right {
			width: 60%;
			margin-right: 30px;
		}

		.left {
			width: 40%;
			span {
				font-weight: 700;
			}
			ul {
				list-style: none;
				padding: 0;
			}
			li {
				padding-bottom: 5px;
			}
		}
	}
`;
