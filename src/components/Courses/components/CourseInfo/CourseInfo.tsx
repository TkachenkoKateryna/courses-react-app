import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../../common/Button/Button';

interface Props {
	getCourseById: (courseId: string) => CourseView | undefined;
}

const CourseInfo: FC<Props> = ({ getCourseById }) => {
	const { courseId } = useParams();
	const course = getCourseById(String(courseId));

	if (!course) {
		return <>Course undefined!</>;
	}

	return (
		<Root>
			<Link to='/'>
				<Button buttonText='Back to courses' />
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
						{course.duration}
					</p>
					<p>
						<span>Created: </span>
						{course.creationDate}
					</p>
					<div>
						<span>Authors: </span>
						<ul>
							{course.authors.split(',').map((a) => (
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
