import { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Button from '../../../../common/Button/Button';
import { Link } from 'react-router-dom';
import { deleteCourseActionCreator } from '../../../../store/courses/courses.actions';

interface Props {
	course: CourseView;
}

export const CourseCard: FC<Props> = ({ course }) => {
	const dispatch = useDispatch();

	return (
		<Root>
			<Content>
				<MainInfo>
					<h2>{course.title}</h2>
					<p>{course.description}</p>
				</MainInfo>
				<Details>
					<div>
						<p>
							<span>Authors: </span> {course.authors}
						</p>
						<p>
							<span>Duration: </span> {course.duration}
						</p>
						<p>
							<span>Created: </span> {course.creationDate}
						</p>
					</div>
				</Details>
			</Content>
			<Actions>
				<Link to={`/courses/${course.id}`}>
					<Button buttonText='Show course' />
				</Link>
				<Button>
					<span className='material-icons'>edit</span>
				</Button>
				<Button
					onClick={() => {
						dispatch(deleteCourseActionCreator(course.id));
					}}
				>
					<span className='material-icons'>delete</span>
				</Button>
			</Actions>
		</Root>
	);
};

const Root = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	box-sizing: border-box;
	min-width: 300px;

	box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

	@media screen and (min-width: 1000px) {
		width: calc(33% - 20px);
		margin: 0 20px 20px 0;
	}

	@media screen and ((min-width: 700px) and (max-width: 1100px)) {
		width: calc(50% - 20px);
		margin: 0 20px 20px 0;
	}

	@media screen and (max-width: 700px) {
		width: 100%;
		margin: 0 0 20px 0;
	}
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;

	@media screen and (min-width: 700px) {
		flex-direction: column;
	}
`;

const MainInfo = styled.div`
	flex: 2;
	margin: 0 30px 0 0;
	text-align: justify;
	width: 100%;

	h2 {
		margin: 0 0 10px 0;
	}

	p {
		display: -webkit-box;
		-webkit-line-clamp: 3; /* no of lines */
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media screen and (min-width: 700px) {
		flex-direction: column;
		margin: 0;
		flex: 1;
	}
`;

const Details = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-top: -5px;
	min-width: 0;

	* {
		margin: 5px 0;

		p {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		span {
			font-weight: 700;
		}
	}

	@media screen and (min-width: 700px) {
		width: 100%;
	}
`;

const Actions = styled.div`
	display: flex;
	align-self: flex-end;

	& > * {
		margin-left: 5px;
	}
`;
