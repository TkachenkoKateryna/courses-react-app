import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../../common/Button/Button';
import { CourseCard } from '../CourseCard/CourseCard';
import SearchBar from '../SearchBar/SearchBar';

interface Props {
	courses: CourseView[];
	searchOnCourses: (searchText: string) => void;
}

const CoursesView: FC<Props> = ({ courses, searchOnCourses }) => {
	return (
		<Root>
			<div className='panel'>
				<SearchBar searchOnCourses={searchOnCourses} />
				<div className='actions'>
					<Link to='/courses/add' relative='path'>
						<Button>Add new course</Button>
					</Link>
				</div>
			</div>
			<div className='course-list'>
				{courses.map((c) => (
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
