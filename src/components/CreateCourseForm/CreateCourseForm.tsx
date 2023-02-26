import { FC, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import CreateAuthorForm from './components/CreateAuthorForm/CreateAuthorForm';

interface Props {
	addCourse: (newCourse: CreateCourseFormValues) => void;
	addAuthor: (newAuthor: CreateAuthorFormValues) => void;
	authors: Author[];
}

const CreateCourse: FC<Props> = ({ addCourse, addAuthor, authors }) => {
	const navigate = useNavigate();

	const [courseForm, setCourseForm] = useState<CreateCourseFormValues>({
		title: '',
		description: '',
		duration: 1,
		authors: [],
	});

	const [courseFormErrors, setCourseFormErrors] =
		useState<CreateCourseFormErrors>({
			title: 'Title is required',
			description: 'Description is required',
			duration: '',
			authors: 'Should be at least 1 author',
		});

	const [hasError, setHasError] = useState(false);

	const isValid = !Object.values(courseFormErrors).some((course) => course);

	const submitHandler = (event: SyntheticEvent) => {
		event.preventDefault();

		if (!isValid) {
			setHasError(true);
			return;
		}

		addCourse(courseForm);
		navigate('/courses');
	};

	const onChangeHandler = (name: string, value: string) => {
		const newValue = name === 'duration' ? +value : value;

		if (value === '') {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: `${name} is required`,
			}));
		} else if (value.length < 2 && name !== 'duration') {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: `${name} should be more than two symbols`,
			}));
		} else {
			setCourseFormErrors((prevState) => ({
				...prevState,
				[name]: '',
			}));
		}

		setCourseForm((oldCourseForm) => ({ ...oldCourseForm, [name]: newValue }));
	};

	const addAuthorToCourseHandler = (authorId: string) => {
		if (courseForm.authors.length === 0) {
			setCourseFormErrors((prevState) => ({
				...prevState,
				authors: '',
			}));
		}
		setCourseForm((prevState) => ({
			...prevState,
			authors: [...prevState.authors, authorId],
		}));
	};

	const removeAuthorFromCourseHandler = (authorId: string) => {
		if (courseForm.authors.length === 1) {
			setCourseFormErrors((prevState) => ({
				...prevState,
				authors: 'Should be at least 1 author',
			}));
		}
		setCourseForm((prevState) => ({
			...prevState,
			authors: prevState.authors.filter((a) => a !== authorId),
		}));
	};

	return (
		<Root>
			<div className='navigation'>
				<Link to='/'>
					<Button buttonText='Return to Courses page' />
				</Link>
			</div>
			<div className='course-form-wrapper'>
				<h2>Create Course</h2>
				<form onSubmit={submitHandler} className='course-form'>
					<div className='main-info'>
						<Input
							type='text'
							label='Title'
							name='title'
							value={courseForm.title}
							onChange={onChangeHandler}
							placeholder='Title'
							errorText={courseFormErrors.title}
							hasError={hasError}
						/>
						<div className='duration-wrapper'>
							<Input
								type='number'
								label='Duration'
								name='duration'
								value={courseForm.duration}
								onChange={onChangeHandler}
								placeholder='Duration'
								min={1}
								errorText={courseFormErrors.duration}
								hasError={hasError}
							/>
							<p> {getCourseDuration(courseForm.duration)}</p>
						</div>
						<Input
							type='text'
							label='Description'
							name='description'
							value={courseForm.description}
							onChange={onChangeHandler}
							placeholder='Description'
							errorText={courseFormErrors.description}
							hasError={hasError}
						/>
					</div>
					<div className='authors-info'>
						<div className='all-authors'>
							<h3>Authors</h3>
							{authors
								.filter(
									(author) => !courseForm.authors.some((a) => a == author.id)
								)
								.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										addAuthorToCourse={addAuthorToCourseHandler}
									/>
								))}
						</div>
						<div className='course-authors'>
							<h3>Course Authors</h3>
							{!!hasError && <Error>{courseFormErrors.authors}</Error>}
							{courseForm.authors.length === 0 && !hasError && (
								<p>No authors attached to the course</p>
							)}
							{authors
								.filter((author) =>
									courseForm.authors.some((a) => a === author.id)
								)
								.map((author) => (
									<AuthorItem
										key={author.id}
										author={author}
										isInCourse={true}
										addAuthorToCourse={removeAuthorFromCourseHandler}
									/>
								))}
						</div>
					</div>
					<Button disabled={hasError && !isValid} buttonText='Submit' />
				</form>
			</div>
			<div className='author-form-wrapper'>
				<h2>Create Author</h2>
				<CreateAuthorForm addAuthor={addAuthor} />
			</div>
		</Root>
	);
};

export default CreateCourse;

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	box-sizing: border-box;
	flex-wrap: wrap;

	.navigation {
		width: 100%;
	}

	.course-form-wrapper {
		width: calc(60%-100px);
		margin-right: 100px;
		box-sizing: border-box;

		.course-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;

			.main-info {
				width: 100%;

				.duration-wrapper {
					display: flex;

					p {
						align-self: end;
						flex: 1;
						margin-left: 10px;
					}

					div {
						flex: 2;
					}
				}
			}
		}
	}

	.author-form-wrapper {
		width: 40%;
		align-self: start;
	}

	.authors-info {
		width: 100%;
		display: flex;
		margin-bottom: 20px;

		.all-authors {
			margin-right: 20px;
			width: 50%;
		}

		.course-authors {
			width: 50%;
		}
	}
`;

const Error = styled.p`
	color: #c88080;
`;
