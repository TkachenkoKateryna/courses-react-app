import { FC } from 'react';
import styled from 'styled-components';

import Button from '../../common/Button/Button';
import { CourseCard } from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

interface Props {
	courses: CourseView[];
	setPageView: () => void;
	searchOnCourses: (searchText: string) => void;
}

const Courses: FC<Props> = ({ courses, setPageView, searchOnCourses }) => {
	return (
		<Root>
			<div className='panel'>
				<SearchBar searchOnCourses={searchOnCourses} />
				<div className='actions'>
					<Button buttonText='Add new course' onClick={setPageView} />
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

export default Courses;

const Root = styled.div`
	max-width: 1300px;
	margin: 0 auto;
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
